import React from "react";
import { Route, Routes } from "react-router-dom";

import { ContextProvider } from "./Context";

import Home from "./components/1_home/Home";
import Profile from "./components/2_profile/Profile";
import Host from "./components/3_host/Host";
import Join from "./components/3_join/Join";
import Stream from "./components/4_stream/Stream";

const App = () => {
  return (
    <ContextProvider>
      <div className="App">WebRTC</div>

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
