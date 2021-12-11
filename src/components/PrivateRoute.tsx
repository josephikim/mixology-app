import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...routeProps }) => {
  const authenticated = useAppSelector((state) => state.auth.accessToken);

  return (
    <Route
      {...routeProps}
      render={(props): JSX.Element => {
        return authenticated ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
