import React, { useContext, useEffect } from "react";
import { ServerContext } from "../../Context";

const Video = () => {
  const { myVideo, audioID, videoID, createUserStream } =
    useContext(ServerContext);

  useEffect(() => {
    createUserStream(audioID, videoID);
  }, [audioID, videoID]);

  return (
    <div className="video">
      <h1>Video</h1>
      <video ref={myVideo} autoPlay playsInline muted />
    </div>
  );
};

export default Video;
