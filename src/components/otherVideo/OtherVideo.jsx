import React, { useContext } from "react";
import { ServerContext } from "../../Context";

const OtherVideo = () => {
  const { otherVideo, otherVideoConnection } = useContext(ServerContext);

  return (
    <div className="otherVideo">
      <h2>OtherVideo</h2>
      {otherVideoConnection ? (
        <video ref={otherVideo} autoPlay playsInline muted />
      ) : (
        <div>Waiting other connection</div>
      )}
    </div>
  );
};

export default OtherVideo;
