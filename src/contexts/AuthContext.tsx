import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import { fetchIdentity } from "../lib/api/api";
import { UserSession } from "../types";

export interface AuthContextType {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

// Define the AuthProvider props type with children
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //TODO move to reducer
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!AsyncStorage.getItem("accessToken"),
  );
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null)
      return;
    }

    fetchIdentity()
      .then((user) => {
        setUser(user);
        alert(JSON.stringify(user));
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setUser(null);
        setIsAuthenticated(false);
      });
  }, [isAuthenticated]);

  // The value that will be supplied to any descendants of this provider
  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
