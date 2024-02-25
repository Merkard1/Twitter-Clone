import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketProvider';

interface IConversationsProviderProps {
  children?: React.ReactNode;
}

export interface IRecipient {
  _id: string;
  fullName: string;
  username: string;
  avatar?: string;
}

export interface IMessage {
  text: string;
  createdAt: Date;
  sender: IRecipient;
}

export interface IConversation {
  recipient: IRecipient;
  messages: IMessage[];
}

interface IUseProvideConversation {
  conversations: IConversation[];
  selectedConversation: number;
  sendMessage: (recipient: IRecipient, text: string, createdAt: Date, sender: IRecipient) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  createConversation: (recipients: IRecipient[]) => void;
}

const ConversationsContext = React.createContext<IUseProvideConversation>({} as IUseProvideConversation);

export const ConversationsProvider: React.FC<IConversationsProviderProps> = ({
  children,
}: IConversationsProviderProps) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0);
  const socket = useSocket();

  function createConversation(recipients: IRecipient[]) {
    setConversations((prevConversations: IConversation[]) => {
      const cleanConversations = prevConversations.filter(item => recipients.includes(item.recipient));
      recipients.forEach(item => {
        if (!cleanConversations.some(chat => chat.recipient === item)) {
          cleanConversations.push({ recipient: item, messages: [] });
        }
      });
      return cleanConversations;
    });
  }

  const addMessageToConversation = useCallback(({ recipient, text, createdAt, sender }) => {
    setConversations((prevConversations: IConversation[]) => {
      let madeChange = false;
      const newMessage: IMessage = { sender, createdAt, text };
      const newConversations = prevConversations.map((conversation: IConversation) => {
        if (conversation.recipient._id === recipient._id) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });

      if (madeChange) {
        return newConversations;
      }
      return [
        ...prevConversations,
        { recipient, messages: [newMessage] },
      ];

    });
  }, [setConversations]);

  useEffect(() => {
    if (socket.on) socket.on('receive-message', addMessageToConversation);

    return () => { if (socket.off) socket.off('receive-message'); };
  }, [socket, addMessageToConversation]);

  function sendMessage(recipient: IRecipient, text: string, createdAt: Date, sender: IRecipient) {
    socket.emit('send-message', { recipient, text, createdAt, sender });
    addMessageToConversation({ recipient, text, createdAt, sender });
  }

  const value = {
    conversations,
    selectedConversation: selectedConversationIndex,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export function useConversations(): IUseProvideConversation {
  return useContext(ConversationsContext);
}
