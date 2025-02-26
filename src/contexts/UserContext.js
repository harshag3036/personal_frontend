import React, { createContext, useState, useContext, useEffect } from 'react';
import config from '../config';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState({
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'member'
  });

  const setAuth = (token, isGuestUser) => {
    setIsAuthenticated(!!token);
    setIsGuest(isGuestUser);
  };

  useEffect(() => {
    const checkAuth = () => {
      // Check session storage first for guest status
      const guestStatus = sessionStorage.getItem('isGuest');
      if (guestStatus === 'true') {
        setIsGuest(true);
        setIsAuthenticated(true);
        setIsLoading(false);
        setAuthChecked(true);
        return;
      }

      // Check local storage for token
      const token = localStorage.getItem('token');
      const isGuestUser = localStorage.getItem('isGuest') === 'true';
      
      setIsAuthenticated(!!token);
      setIsGuest(isGuestUser);
      setIsLoading(false);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return null; // Don't render anything until auth is checked
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isGuest');
    localStorage.removeItem('firstLogin');
    localStorage.removeItem('customerId');
    sessionStorage.clear();
    setIsAuthenticated(false);
    setIsGuest(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    isGuest,
    logout,
    authChecked,
    setAuth,
    user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
