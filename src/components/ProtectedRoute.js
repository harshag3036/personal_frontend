import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isGuest, authChecked } = useUser();

  if (!authChecked || (isLoading && !isGuest)) {
    return null; // Don't render anything until auth is checked
  }

  return (isAuthenticated || isGuest) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
