// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Directly return children or Navigate component based on currentUser status
  // There's no need to use the Route component from react-router-dom as wrapper
  // because in React Router v6, you define the Route logic in App.js or where you define your routes
  if (!currentUser) {
    // Redirect user to login page if not authenticated
    // The state prop can be used to store the current location for future redirect back, but it's optional
    return <Navigate to="/login" replace />;
  }

  // If currentUser exists, render the children components which represents the protected page/component
  return children;
};

export default ProtectedRoute;
