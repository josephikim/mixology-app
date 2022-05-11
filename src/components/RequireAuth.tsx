import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../hooks';

interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const isAuthenticated = !!authToken;
  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
