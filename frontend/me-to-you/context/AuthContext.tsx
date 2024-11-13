"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAuthStatus } from "@/services/auth-actions";

interface AuthContextType {
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateAuthStatus = async () => {
      const status = await getAuthStatus();
      setIsLoggedIn(status);
    };

    updateAuthStatus();
  }, [pathname]);

  return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
};
