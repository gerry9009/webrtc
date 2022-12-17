import React from "react";
import { Link } from "react-router-dom";

import Video from "../video/Video";

const Profile = () => {
  return (
    <div className="profile">
      <h2>Create your video profile</h2>

      <Link to="/join">
        <button>Join your friend</button>
      </Link>
      <Link to="/host">
        <button>Create Room</button>
      </Link>

      <Video />
    </div>
  );
};

export default Profile;
