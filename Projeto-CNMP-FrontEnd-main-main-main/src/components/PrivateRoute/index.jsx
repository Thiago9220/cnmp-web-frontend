import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserProfile = () => {
  const perfil = localStorage.getItem('perfil');
  return perfil || null;
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // Verifica se o usuário está logado
  const userProfile = getUserProfile(); // Obtém o perfil do usuário

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userProfile)) {
    return <Navigate to="/medicoes" />; // Redireciona o usuário para a página de medição de indicadores
  }

  return children;
};

export default PrivateRoute;
