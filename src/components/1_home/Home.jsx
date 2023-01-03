import React from "react";
import { Link } from "react-router-dom";

import Picture from "../../assets/img-bg.jpeg";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img className="home-img" src={Picture} alt="Man doing video chat" />
      <div className="home-container">
        <h2 className="home-heading">Let's start the fun</h2>
        <Link to="/profile">
          <button className="home-btn">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
