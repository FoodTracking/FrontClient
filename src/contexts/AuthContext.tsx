import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});

// Define the AuthProvider props type with children
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!AsyncStorage.getItem("accessToken"),
  );

  // The value that will be supplied to any descendants of this provider
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
