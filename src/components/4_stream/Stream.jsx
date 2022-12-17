import React from "react";

import Video from "../video/Video";
import OtherVideo from "../otherVideo/OtherVideo";
import Messenger from "../messenger/Messenger";

const Stream = () => {
  return (
    <div className="stream">
      <h1>Stream</h1>
      <Video />
      <OtherVideo />
      <Messenger />
    </div>
  );
};

export default Stream;
