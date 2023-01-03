import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/logo.png";

const Logo = () => {
  return <img src={logo} alt="Logo" className="header-logo" />;
};

const Header = () => {
  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      <h1>Chat</h1>
    </header>
  );
};

export default Header;
