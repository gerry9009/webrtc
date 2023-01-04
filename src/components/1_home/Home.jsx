import React from "react";
import { Link } from "react-router-dom";

//<img className="home-img" src={Picture} alt="Man doing video chat" />

const Home = () => {
  return (
    <div className="greeting home">
      <div className="greeting-container">
        <h2 className="greeting-heading">Let's start the meeting</h2>
        <p className="greeting-paragraph">
          Make video chat with your friend wherever you want
        </p>
        <Link to="/profile">
          <button className="greeting-btn">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
