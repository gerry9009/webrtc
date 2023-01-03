import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import { ContextProvider } from "./Context";

import Home from "./components/1_home/Home";
import Profile from "./components/2_profile/Profile";
import Host from "./components/3_host/Host";
import Join from "./components/3_join/Join";
import Stream from "./components/4_stream/Stream";

import logo from "./assets/logo.png";

import "./App.css";

const Logo = () => {
  return <img src={logo} alt="Logo" className="header-logo" />;
};

const App = () => {
  return (
    <ContextProvider>
      <header>
        <Link to="/">
          <Logo />
        </Link>
        <h1>AwesomeChat</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/host" element={<Host />} />
        <Route path="/join" element={<Join />} />
        <Route path="/stream" element={<Stream />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
