import React from "react";

import Video from "../video/Video";
import OtherVideo from "../otherVideo/OtherVideo";

const Stream = () => {
  return (
    <div className="stream">
      <h1>Stream</h1>
      <Video />
      <OtherVideo />
    </div>
  );
};

export default Stream;
