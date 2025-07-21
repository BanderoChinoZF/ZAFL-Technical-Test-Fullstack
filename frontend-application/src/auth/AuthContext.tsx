// src/context/AuthContext.tsx
import { useState} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContextInterface";
import axios from "axios";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  //Request for get Authentication Token
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem("AuthToken", response.data.token);
        console.log("redirecting to dashboard");
        navigate("/dashboard");

      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("AuthToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};