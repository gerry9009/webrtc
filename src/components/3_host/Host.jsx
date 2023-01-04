import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ServerContext } from "../../Context";
import Video from "../video/Video";

import "./Host.css";

const Host = () => {
  const { user, otherUser, isCalling, answerCall } = useContext(ServerContext);

  const handleReceiveBtn = () => {
    answerCall();
  };

  const SendingMenu = () => {
    return (
      <>
        <p>Send this ID to your friend:</p>
        <p>{user.socketID}</p>
      </>
    );
  };

  const ReceiveMenu = () => {
    return (
      <>
        <p>
          <span className="host-caller">{otherUser.name}</span> is calling you
        </p>
        <Link to="/stream">
          <button className="btn" onClick={handleReceiveBtn}>
            Receive call
          </button>
        </Link>
      </>
    );
  };

  return (
    <div className="host main-container">
      <div className="second-container">
        <h2>Welcome here, {user.name}</h2>

        {isCalling ? <ReceiveMenu /> : <SendingMenu />}
      </div>
      <div className="profile-container">
        <Video />
      </div>
    </div>
  );
};

export default Host;
