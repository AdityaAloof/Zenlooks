// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for an authenticated user on mount
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign out error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
