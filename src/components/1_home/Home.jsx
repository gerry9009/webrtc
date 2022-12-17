import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h2>Home screen</h2>
      <Link to="/profile">
        <button>Start</button>
      </Link>
    </div>
  );
};

export default Home;
