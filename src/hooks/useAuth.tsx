import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error reading auth data from localStorage", error);
    }
  }, []);

  const login = (data: any) => {
    if (data?.accessToken && data?.user) {
      try {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error storing auth data in localStorage", error);
      }
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      window.location.reload();
      return <Navigate to="/login" replace />;
    } catch (error) {
      console.error("Error removing auth data from localStorage", error);
    }
  };

  return { user, token, isAuthenticated, login, logout };
};

export default useAuth;
