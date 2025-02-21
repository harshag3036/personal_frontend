import React, { createContext, useState, useContext, useEffect } from 'react';
import config from '../config';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session storage first for guest status
        const guestStatus = sessionStorage.getItem('isGuest');
        if (guestStatus === 'true') {
          setIsGuest(true);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // Verify authentication with backend
        const response = await fetch(`${config.API_BASE_URL}/api/v1/verify`, {
          method: 'GET',
          credentials: 'include', // Send cookies
          headers: {
            'Accept': 'application/json'
          }
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Auth verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${config.API_BASE_URL}/api/v1/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear session storage
      sessionStorage.clear();
      setIsAuthenticated(false);
      setIsGuest(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    isGuest,
    logout
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
