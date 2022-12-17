import React from "react";
import { Link } from "react-router-dom";
import Video from "../video/Video";

const Host = () => {
  return (
    <div className="host">
      <h1>Host</h1>
      <Link to="/stream">
        <button>Receive call</button>
      </Link>

      <Video />
    </div>
  );
};

export default Host;
