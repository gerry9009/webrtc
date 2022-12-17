import React, { createContext } from "react";

const ServerContext = createContext();

const ContextProvider = ({ children }) => {
  const value = "";

  return (
    <ServerContext.Provider value={{ value }}>
      {children}
    </ServerContext.Provider>
  );
};

export { ContextProvider, ServerContext };
