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
  const { authType } = routeProps;

  if (authType === 'private' && !authToken) return <Redirect to="/login" />;

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
