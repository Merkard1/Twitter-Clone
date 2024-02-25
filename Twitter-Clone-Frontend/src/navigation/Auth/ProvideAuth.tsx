import React from 'react';
import { IUseProvideAuth, useProvideAuth } from './useProvideAuth';

interface IProvideAuthProps {
  children?: React.ReactNode;
}

interface IWarningObject extends IUseProvideAuth {
  readonly foo: void;
}

const warningObject: IWarningObject = {
  isAuthenticated: () => false,
  logOut: () => ({}),
  updateCurrentUserState: () => ({}),
  get foo() {
    throw new Error('You probably forgot to put <UseProvideAuth>.');
  },
};

const AuthContext = React.createContext<IUseProvideAuth | IWarningObject>(warningObject);

export const ProvideAuth: React.FC<IProvideAuthProps> = ({ children }: IProvideAuthProps) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IUseProvideAuth {
  return React.useContext(AuthContext);
}
