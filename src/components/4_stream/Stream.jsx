import React, { useState, useEffect } from "react";

import Video from "../video/Video";
import OtherVideo from "../otherVideo/OtherVideo";
import Messenger from "../messenger/Messenger";

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
  "max-width": "none",
  "border-right": "1px solid black",
  "border-bottom-right-radius": "0",
  "border-bottom-left-radius": "0",
};

const Stream = () => {
  const [width, setWidth] = useState(getWidth());

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

  return (
    <div className="stream">
      <div className="stream-container">
        <Video style={width < 1200 ? small : medium} />
        <OtherVideo />
      </div>
      <Messenger />
    </div>
  );
};

export default Stream;
