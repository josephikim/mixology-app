import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAppSelector } from '../hooks';

export type AuthRouteProps = {
  component: React.ElementType;
  path: RouteProps['path'];
  type: string;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ component: Component, ...routeProps }) => {
  const authToken = useAppSelector((state) => state.auth.accessToken);
  const { type } = routeProps;

  if (type === 'guest' && authToken) return <Redirect to="/collection" />;
  else if (type === 'private' && !authToken) return <Redirect to="/login" />;

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
