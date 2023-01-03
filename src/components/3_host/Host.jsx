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
        <p>Send this id to your friend:</p>
        <p>{user.socketID}</p>
      </>
    );
  };

  const ReceiveMenu = () => {
    return (
      <>
        <p>{otherUser.name} is calling you</p>
        <Link to="/stream">
          <button onClick={handleReceiveBtn}>Receive call</button>
        </Link>
      </>
    );
  };

  return (
    <div className="host">
      <h2>Welcome here {user.name}</h2>

      {isCalling ? <ReceiveMenu /> : <SendingMenu />}

      <Video />
    </div>
  );
};

export default Host;
