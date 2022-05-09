import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAppSelector } from '../hooks';

interface AuthRouteProps {
  component: React.ElementType;
  path: RouteProps['path'];
  authType: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ component: Component, ...routeProps }) => {
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const { path, authType } = routeProps;

  if (authType === 'private' && !authToken) return <Redirect to="/login" />;
  if (authToken && (path === '/login' || path === '/register')) return <Redirect to="/" />;

  return (
    <Route
      {...routeProps}
      render={(props): JSX.Element => {
        return <Component {...props} />;
      }}
    ></Route>
  );
};

export default AuthRoute;
