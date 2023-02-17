import React from "react";
import { Route, Routes } from "react-router-dom";

import { ContextProvider } from "./Context";
import { BeforeUnloadProvider } from "./BeforeUnloadContext";

import Header from "./components/0_header/Header";
import Home from "./components/1_home/Home";
import Profile from "./components/2_profile/Profile";
import Host from "./components/3_host/Host";
import Join from "./components/3_join/Join";
import Stream from "./components/4_stream/Stream";
import Close from "./components/5_close/Close";

import "./App.css";

const App = () => {
  return (
    <ContextProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/host" element={<Host />} />
        <Route path="/join" element={<Join />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/close" element={<Close />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
