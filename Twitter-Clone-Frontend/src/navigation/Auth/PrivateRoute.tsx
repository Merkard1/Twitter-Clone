import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

interface IPrivateRouteProps {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
  ...rest
}: IPrivateRouteProps) => {
  const isAuthed = useAuth().isAuthenticated();

  return (
    <Route {...rest} render={({ location }) => {
      if (isAuthed === true) {
        if (location.pathname === '/') return (
          <Redirect to={{
            pathname: '/home',
            state: { from: location },
          }} />
        );

        return children;
      }

      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: location },
        }} />
      );
    }} />
  );
};

export default PrivateRoute;
