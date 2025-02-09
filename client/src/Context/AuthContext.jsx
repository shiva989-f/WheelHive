import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL

  return (
    <AuthContext.Provider value={{ token, setToken, baseURL, isLogoutOpen, setIsLogoutOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
