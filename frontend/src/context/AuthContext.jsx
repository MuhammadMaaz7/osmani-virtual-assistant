import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken, logout as apiLogout } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);

  // Check if the user is authenticated
  const isAuthenticated = !!accessToken;

  // Login function
  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("Invalid userData or token");
      return;
    }

    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
  };

  // Logout function
  const logout = async () => {
    try {
      let token = accessToken;

      // Check if the access token is expired
      if (isTokenExpired(token)) {
        // Attempt to refresh the token
        token = await refreshToken();
      }

      // Call the logout API with the valid token
      await apiLogout(token);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state and storage
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  };

  // Refresh access token
  const refreshToken = async () => {
    try {
      const data = await refreshAccessToken();
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken; // Return the new token
    } catch (error) {
      logout(); // Logout if refresh token fails
      throw error;
    }
  };

  // Check if the access token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Convert expiration time to milliseconds
  };

  // Effect to check token validity on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      if (isTokenExpired(storedToken)) {
        // Token is expired, attempt to refresh it
        refreshToken();
      } else {
        // Token is valid, set user and token
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);