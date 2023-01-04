import React, { useContext } from "react";
import { ServerContext } from "../../Context";
import Video from "../video/Video";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const { user, callUser } = useContext(ServerContext);

  const handleSubmit = () => {
    const otherUserID = document.getElementById("join-otherUser").value;
    callUser(otherUserID);
  };

  return (
    <div className="join main-container">
      <div className="second-container">
        <h2>Welcome here {user.name}</h2>
        <form className="join-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Enter your friend's ID here:
            <input type="text" id="join-otherUser" />
          </label>
        </form>
        <Link to="/stream">
          <button className="btn" onClick={handleSubmit}>
            Join
          </button>
        </Link>
      </div>
      <div className="profile-container">
        <Video />
      </div>
    </div>
  );
};

export default Join;
