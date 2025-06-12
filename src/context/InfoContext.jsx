import React, { createContext, useContext, useState, useEffect } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile") || null)
  );

  const [isRender, setIsRender] = useState(false);

  const serverUrl = import.meta.env.REACT_APP_SERVER_URL;

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
    setHasRedirected(false);
  };

  const value = {
    currentUser,
    setCurrentUser,
    exit,
    serverUrl,
    isRender,
    setIsRender,
  };

  return (
    <InfoContext.Provider value={value}>
      {children}
    </InfoContext.Provider>
  );
};
