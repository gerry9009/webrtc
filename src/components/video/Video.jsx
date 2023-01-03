import React, { useContext, useEffect, useState } from "react";
import { ServerContext } from "../../Context";

const Video = ({ style }) => {
  const { myVideo, audioID, videoID, createUserStream } =
    useContext(ServerContext);

  //TODO: create mute and unmute functionality
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    createUserStream(audioID, videoID);
  }, [audioID, videoID]);

  const handleBtn = () => {
    const video = document.querySelector(".user-video");

    isMuted ? (video.muted = false) : (video.muted = true);

    setIsMuted((isMuted) => !isMuted);
  };

  return (
    <div className="video">
      {/*<button onClick={handleBtn}>{isMuted ? "mute" : "unmute"}</button>*/}
      <video
        style={style}
        className="user-video"
        ref={myVideo}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default Video;
