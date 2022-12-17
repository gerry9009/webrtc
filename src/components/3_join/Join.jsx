import React, { useContext } from "react";
import { ServerContext } from "../../Context";
import Video from "../video/Video";

import { Link } from "react-router-dom";

const Join = () => {
  const { user, callUser } = useContext(ServerContext);

  const handleSubmit = () => {
    const otherUserID = document.getElementById("join-otherUser").value;
    callUser(otherUserID);
  };

  return (
    <div className="join">
      <h2>Welcome here {user.name}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" id="join-otherUser" />
      </form>
      <Link to="/stream">
        <button onClick={handleSubmit}>Join</button>
      </Link>
      <Video />
    </div>
  );
};

export default Join;
