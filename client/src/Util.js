import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000, // Duration in milliseconds (5 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", // Optional: "light" or "dark" themes
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000, // Duration in milliseconds (5 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", // Optional: "light" or "dark" themes
  });
};



export const isTokenExpired = (token) => {
  if (!token) return true; // No token available
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    // This means the token has expired (the current time has reached or surpassed the expiration time).
    if (decodedToken.exp <= currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
    }
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // Invalid token
  }
};
