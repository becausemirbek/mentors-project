import React, { createContext, useState } from "react";
import axios from "axios";

interface ContextI {
  loading: boolean;
  error: any;
  currentUser: any;
  handleSignIn: any;
}

const initVal = {
  loading: false,
  error: "",
  currentUser: "",
  handleSignIn: () => {},
};

export const authContext = createContext<ContextI>(initVal);

const API = "http://34.173.115.25/api/v1";

interface UserI {
  email: string;
  password: string;
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/account/login`, user);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", user.email);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <authContext.Provider
      value={{
        loading,
        error,
        currentUser,
        handleSignIn,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
