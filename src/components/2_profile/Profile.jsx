import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ServerContext } from "../../Context";
import { v4 as uuidv4 } from "uuid";

import { BiUser, BiMicrophone, BiCamera } from "react-icons/bi";

import "./Profile.css";

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
      <select
        className="profile-render"
        id="audio-input"
        onChange={handleAudioOnChange}
        value={audioID}
      >
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
      <select
        className="profile-render"
        id="video-input"
        onChange={handleVideoOnChange}
        value={videoID}
      >
        {myVideoDevices.map((video) => (
          <option value={video.deviceId} key={uuidv4()}>
            {video.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="profile main-container">
      <h2 className="profile-heading">Create your video profile</h2>
      {settledDevices ? (
        <div className="profile-form second-container container-row">
          <Link to="/join">
            <button className="btn ">Join your friend</button>
          </Link>
          <Link to="/host">
            <button className="btn btn-second">Create Room</button>
          </Link>
        </div>
      ) : (
        <form
          className="profile-form second-container"
          onSubmit={handleDevicesForm}
        >
          <label>
            <BiUser />
            <input type="text" id="username" placeholder="Username" />
          </label>
          <label>
            <BiMicrophone />
            <RenderAudio />
          </label>
          <label>
            <BiCamera />
            <RenderVideo />
          </label>
          <input type="submit" value="Start" className="btn" />
        </form>
      )}
      <div className="profile-container">
        <Video />
      </div>
    </div>
  );
};

export default Profile;
