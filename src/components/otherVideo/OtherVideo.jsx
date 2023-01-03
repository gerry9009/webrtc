import React, { useContext, useState } from "react";
import { ServerContext } from "../../Context";

const OtherVideo = () => {
  const { otherVideo, otherVideoConnection } = useContext(ServerContext);

  //TODO: create mute and unmute functionality
  const [isMuted, setIsMuted] = useState(true);

  const handleBtn = () => {
    const video = document.querySelector(".user-video");

    isMuted ? (video.muted = false) : (video.muted = true);

    setIsMuted((isMuted) => !isMuted);
  };

  return (
    <div className="otherVideo">
      <h2>OtherVideo</h2>
      <button onClick={handleBtn}>{isMuted ? "unmute" : "mute"}</button>
      {otherVideoConnection ? (
        <video ref={otherVideo} autoPlay playsInline />
      ) : (
        <div>Waiting other connection</div>
      )}
    </div>
  );
};

export default OtherVideo;
