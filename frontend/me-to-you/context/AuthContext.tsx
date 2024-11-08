"use client";

import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
  initialIsLoggedIn: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialIsLoggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialIsLoggedIn);

  return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
};
