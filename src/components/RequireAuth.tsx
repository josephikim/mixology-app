import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';

interface RequireAuthProps {
  children?: React.ReactNode;
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const location = useLocation();

  const locationState = {
    nextPathname: location.pathname
  };

  return authToken ? <div>{children}</div> : <Navigate to={redirectTo} state={locationState} replace />;
};

export default RequireAuth;
