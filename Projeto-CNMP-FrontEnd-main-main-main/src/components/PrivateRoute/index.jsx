import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserProfile = () => {
  const perfil = localStorage.getItem('perfil');
  return perfil || null;
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userProfile = getUserProfile();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userProfile)) {
    return <Navigate to="/medicoes" />;
  }

  return children;
};

export default PrivateRoute;
