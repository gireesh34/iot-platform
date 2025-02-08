import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getDecodedToken,
  isTokenValid,
  removeToken,
  JWTPayload,
} from "@/lib/jwt";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: JWTPayload | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      const decoded = getDecodedToken();
      setUser(decoded);
    } else {
      removeToken();
      setUser(null);
    }
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
