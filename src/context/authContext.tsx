import React, { createContext, useState } from "react";
import axios from "axios";

interface ContextI {
  loading: boolean;
  error: any;
  currentUser: any;
  handleSignIn: any; // (data: any) => void;
  handleSignUp: any; // (data: any, navigate: (value: string) => void) => void;
  handleSignOut: any; // (data: any, navigate: (value: string) => void) => void;
}

const initVal = {
  loading: false,
  error: "",
  currentUser: "",
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleSignOut: () => {},
};

export const authContext = createContext<ContextI>(initVal);

const API = "http://34.173.115.25/api/v1";

interface UserI {
  email: string;
  password: string;
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/account/login/`, user);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", user.email);
      navigate("/");
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      await axios.post(`${API}/account/register/`, user);
      navigate("/sign-in");
    } catch (error) {
      console.log(error, "error");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = (navigate: (value: string) => void) => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser("");
    navigate("/sign-in");
  };

  return (
    <authContext.Provider
      value={{
        loading,
        error,
        currentUser,
        handleSignIn,
        handleSignUp,
        handleSignOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
