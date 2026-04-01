import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "professor" | "student";

interface AuthState {
  userId: number;
  role: UserRole;
}

interface AuthContextType {
  user: AuthState | null;
  login: (userId: number, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthState | null>(() => {
    const saved = localStorage.getItem("emsi_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userId: number, role: UserRole) => {
    const u = { userId, role };
    setUser(u);
    localStorage.setItem("emsi_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("emsi_user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
