import React, { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import Peer from "simple-peer";

const ServerContext = createContext();

const ContextProvider = ({ children }) => {
  // create video connection with the video object
  const [myAudioDevices, setMyAudioDevices] = useState();
  const [myVideoDevices, setMyVideoDevices] = useState();
  const [audioID, setAudioID] = useState("default");
  const [videoID, setVideoID] = useState("default");

  const myVideo = useRef({ srcObject: null });
  const otherVideo = useRef({ srcObject: null });

  // create user profile
  const [user, setUser] = useState({
    name: null, // set in the Profile.jsx
    socketID: null,
    peerSignal: null,
    stream: null,
  });

  // create user profile to the other user
  const [otherUser, setOtherUser] = useState({
    name: null,
    socketID: null,
    peerSignal: null,
    stream: null,
  });

  const socket = useRef();
  const peer = useRef();

  const [isCalling, setIsCalling] = useState(false);
  const [otherVideoConnection, setOtherVideoConnection] = useState(false);

  const [messages, setMessages] = useState([]);
  const [isReceivedMessage, setIsReceivedMessage] = useState(false);

  useEffect(() => {
    getInputDevices();
  }, []);

  useEffect(() => {
    setOtherVideoConnection(true);
  }, [otherVideo]);

  //TODO:-----------------------------------------------
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location.hash);

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    //TODO: beállítom, hogy kapjon üzenetet
    const handleUnload = () => {
      setIsReceivedMessage(true);

      navigate("/");
      //window.location.hash = "/";
      //window.location.reload();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [navigate]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#confirm-leave") {
        console.log("hash change");
        navigate("/");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [navigate]);

  //TODO:-----------------------------------------------
  // set User's name with a function
  const setUserName = (name) => {
    setUser({ ...user, name });
  };

  // get all audio and video devices from the computer => render to a list
  const getInputDevices = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        let audio = [];
        let video = [];
        devices.forEach((device) => {
          if (device.kind === "audioinput") {
            audio.push(device);
          } else if (device.kind === "videoinput") {
            video.push(device);
          }
        });
        setMyAudioDevices(audio);
        setMyVideoDevices(video);
        setAudioID(audio[0].deviceId);
        setVideoID(video[0].deviceId);
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  // create setGetMessage to the main user
  const createUserStream = (audioDevicesID, videoDevicesID) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: { deviceId: audioDevicesID },
        video: { deviceId: videoDevicesID },
      })
      .then((stream) => {
        myVideo.current.srcObject = stream;

        setUser({ ...user, stream });
      });
  };

  const initializeSocket = (name) => {
    // 2-initialize socket server
    //socket.current = io("http://localhost:8000/");
    socket.current = io("https://gergo-webrtc-server.azurewebsites.net/");

    // 5-receive socket message with user socket id
    socket.current.on("connected", (socketID) => {
      setUser({ ...user, socketID, name });
    });

    // 9-Receive call from other user
    socket.current.on("receiveCall", (callerUser, peerSignal) => {
      setIsCalling(true);
      setOtherUser({ ...callerUser, peerSignal });
    });

    // Receive message from other user
    socket.current.on("receiveMsg", (msgObj) => {
      setIsReceivedMessage(true);
      setMessages((messages) => [...messages, msgObj]);
    });
  };

  const callUser = (calledUserID) => {
    // 6-create caller user peer
    peer.current = new Peer({
      initiator: true,
      trickle: false,
      stream: user.stream,
    });

    //7-send user's peer signal to the called user
    peer.current.on("signal", (peerSignal) => {
      setUser({ ...user, peerSignal });
      socket.current.emit("callOtherUser", calledUserID, user, peerSignal);
    });

    peer.current.on("stream", (stream) => {
      otherVideo.current.srcObject = stream;
    });

    //12 - receive the called user data if the call was successful
    socket.current.on("callAccepted", ({ name, socketID, stream }, signal) => {
      setOtherUser({
        ...otherUser,
        name,
        socketID,
        stream,
        peerSignal: signal,
      });

      peer.current.signal(signal);
    });
  };

  const answerCall = () => {
    // 8- create receiver peer
    peer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: user.stream,
    });

    // 10- create receiver user peer signal and send it to the caller
    peer.current.on("signal", (data) => {
      setUser({ ...user, peerSignal: data });
      socket.current.emit("acceptCall", otherUser, user, data);
    });

    // 13- set called user video src
    peer.current.on("stream", (stream) => {
      otherVideo.current.srcObject = stream;
    });

    //this is required when a peer is a non-initiator peer
    peer.current.signal(otherUser.peerSignal);
  };

  const sendMessage = (msg) => {
    setMessages((messages) => [...messages, msg]);
    socket.current.emit("sendMsg", otherUser.socketID, msg);
  };

  return (
    <ServerContext.Provider
      value={{
        user,
        otherUser,
        myAudioDevices,
        myVideoDevices,
        audioID,
        setAudioID,
        videoID,
        setVideoID,
        myVideo,
        otherVideo,
        createUserStream,
        setUserName,
        initializeSocket,
        callUser,
        answerCall,
        isCalling,
        otherVideoConnection,
        sendMessage,
        messages,
        isReceivedMessage,
        setIsReceivedMessage,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ContextProvider, ServerContext };
