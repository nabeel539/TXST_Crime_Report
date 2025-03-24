/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  validateToken,
  userLogin,
  logoutUser as apiLogout,
} from "../services/apiServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored token and validate it on app load
    const token = localStorage.getItem("token");
    if (token) {
      checkUserSession();
    } else {
      setLoading(false);
    }
  }, []);

  const checkUserSession = async () => {
    try {
      setLoading(true);
      const response = await validateToken();
      if (response.success) {
        setUser(response.user);
      } else {
        // Clear token if it's invalid
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Session validation error:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await userLogin(email, password);

      if (response.success) {
        // Token is stored in localStorage in the API service
        setUser(response.user);
        return response;
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      setError(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always remove user state and token on logout attempt
      setUser(null);
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, checkUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
