import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Video from "../video/Video";
import OtherVideo from "../otherVideo/OtherVideo";
import Messenger from "../messenger/Messenger";
import { ServerContext } from "../../Context";

import "./Stream.css";

const small = {
  width: "30vw",
  position: "absolute",
  top: "5vh",
  right: "2vw",
};

const medium = {
  width: "100%",
  height: "100%",
  position: "static",
  maxWidth: "none",
  borderLeft: "1px solid black",
  borderBottomRightRadius: "0",
  borderBottomLeftRadius: "0",
};

const Stream = () => {
  const {
    user,
    otherUser,
    isReceivedMessage,
    setIsReceivedMessage,
    disconnection,
    isOtherUserLeft,
  } = useContext(ServerContext);

  const [width, setWidth] = useState(getWidth());
  const [msgIsOpen, setMsgIsOpen] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(getWidth);
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWidth() {
    const { innerWidth } = window;

    return innerWidth;
  }

  function handleMsgBtn() {
    setMsgIsOpen((prevMsg) => !prevMsg);
    setIsReceivedMessage(false);
  }

  function handleEndCall() {
    disconnection();
  }

  function LostConnection() {
    return <div className="stream-end-msg">{user.name} left the meeting</div>;
  }

  return (
    <div className="stream">
      <div className="stream-container">
        <p className="stream-other-user">{otherUser.name}</p>
        <p className="stream-user">{user.name}</p>
        <Video style={width < 1200 ? small : medium} />

        {isOtherUserLeft ? <LostConnection /> : <OtherVideo />}
      </div>
      <div className="stream-msg-container">
        <Link to="/close">
          <button className="btn" onClick={handleEndCall}>
            End Call
          </button>
        </Link>
        {isReceivedMessage ? (
          <button className="btn getMsg" onClick={handleMsgBtn}>
            Messenger
          </button>
        ) : (
          <button className="btn" onClick={handleMsgBtn}>
            Messenger
          </button>
        )}

        {msgIsOpen && <Messenger handleMsgBtn={handleMsgBtn} />}
      </div>
    </div>
  );
};

export default Stream;
