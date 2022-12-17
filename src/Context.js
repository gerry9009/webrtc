import React, { createContext, useState, useRef, useEffect } from "react";

import { io } from "socket.io-client";
import Peer from "simple-peer";

const ServerContext = createContext();

const ContextProvider = ({ children }) => {
  const [myAudioDevices, setMyAudioDevices] = useState();
  const [myVideoDevices, setMyVideoDevices] = useState();
  const [audioID, setAudioID] = useState("default");
  const [videoID, setVideoID] = useState("default");

  const myVideo = useRef({ srcObject: null });
  const otherVideo = useRef({ srcObject: null });

  useEffect(() => {
    getInputDevices();
  }, []);

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

  // create stream to the main user
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

  return (
    <ServerContext.Provider
      value={{
        myAudioDevices,
        myVideoDevices,
        audioID,
        setAudioID,
        videoID,
        setVideoID,
        myVideo,
        otherVideo,
        createUserStream,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ContextProvider, ServerContext };
