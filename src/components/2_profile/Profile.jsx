import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ServerContext } from "../../Context";
import { v4 as uuidv4 } from "uuid";

import Video from "../video/Video";

const Profile = () => {
  const {
    myAudioDevices,
    myVideoDevices,
    audioID,
    setAudioID,
    videoID,
    setVideoID,
    initializeSocket,
  } = useContext(ServerContext);

  const [settledDevices, setSettledDevices] = useState(false);

  const handleAudioOnChange = (e) => {
    setAudioID(e.target.value);
  };

  const handleVideoOnChange = (e) => {
    setVideoID(e.target.value);
  };

  const handleDevicesForm = (e) => {
    e.preventDefault();
    setSettledDevices(true);

    const name =
      document.getElementById("username").value ||
      "anonymus" + uuidv4().toString().slice(0, 3);

    //initialize socket here with user name
    initializeSocket(name);
  };

  const RenderAudio = () => {
    return (
      <select id="audio-input" onChange={handleAudioOnChange} value={audioID}>
        {myAudioDevices.map((audio) => (
          <option value={audio.deviceId} key={uuidv4()}>
            {audio.label}
          </option>
        ))}
      </select>
    );
  };

  const RenderVideo = () => {
    return (
      <select id="video-input" onChange={handleVideoOnChange} value={videoID}>
        {myVideoDevices.map((video) => (
          <option value={video.deviceId} key={uuidv4()}>
            {video.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="profile">
      <h2>Create your video profile</h2>
      {settledDevices ? (
        <>
          <Link to="/join">
            <button>Join your friend</button>
          </Link>
          <Link to="/host">
            <button>Create Room</button>
          </Link>
        </>
      ) : (
        <form onSubmit={handleDevicesForm}>
          <label>
            Username:
            <input type="text" id="username" placeholder="Username" />
          </label>
          <label>
            Microphone:
            <RenderAudio />
          </label>
          <label>
            Camera:
            <RenderVideo />
          </label>
          <input type="submit" value="Start" />
        </form>
      )}

      <Video />
    </div>
  );
};

export default Profile;
