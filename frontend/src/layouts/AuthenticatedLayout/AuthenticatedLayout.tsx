import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const AuthenticatedLayout: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (isLoggedIn) {
    return <Component />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export { AuthenticatedLayout };
