
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useLocalStorage from '../hooks/useLocalStorage';
import { IUser } from '../store/ducks/user/contracts/state';

interface ISocketProviderProps {
  children?: React.ReactNode;
}

const SocketContext = React.createContext<Socket>({} as Socket);

export const SocketProvider: React.FC<ISocketProviderProps> = ({ children }: ISocketProviderProps) => {
  const [socket, setSocket] = useState({} as Socket);
  const [currentUser] = useLocalStorage('currentUser', []) as [IUser];
  const id = currentUser._id;

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { query: { id } });
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): Socket {
  return useContext(SocketContext);
}
