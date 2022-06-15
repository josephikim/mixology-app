import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';

interface RequireAuthProps {
  children?: React.ReactNode;
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
  const authToken = useAppSelector((state) => state.auth.accessToken);

  return authToken ? <div>{children}</div> : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
