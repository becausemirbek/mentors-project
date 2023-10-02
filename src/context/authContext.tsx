import React, { createContext, useState } from "react";
import axios from "axios";

export const authContext = createContext({});

const API = "http://34.173.115.25/api/v1";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <authContext.Provider
      value={{
        loading,
        error,
        currentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
