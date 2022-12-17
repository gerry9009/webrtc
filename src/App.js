import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ContextProvider } from "./Context";

import Home from "./components/1_home/Home";
import Profile from "./components/2_profile/Profile";
import Host from "./components/3_host/Host";
import Join from "./components/3_join/Join";
import Steam from "./components/4_stream/Stream";

const App = () => {
  return (
    <ContextProvider>
      <div className="App">WebRTC</div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/host" element={<Host />} />
          <Route path="/join" element={<Join />} />
          {<Route path="/steam" element={<Steam />} />}
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
