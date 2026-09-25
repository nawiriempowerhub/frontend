import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import Loading from '../ui/Loading';

const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;

