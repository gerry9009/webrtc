import React from "react";
import Video from "../video/Video";

import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="join">
      <h1>Join</h1>

      <Link to="/stream">
        <button>Join</button>
      </Link>
      <Video />
    </div>
  );
};

export default Join;
