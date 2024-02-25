import React from 'react';
import './Chats.scss';
import { RiMailAddLine } from 'react-icons/ri';
import Chat from '../chat/Chat';
import { useConversations } from '../../../../contexts/ConversationsProvider';

interface IChatsProps {
  handleClickOpenModal: (event: React.MouseEvent<HTMLElement | SVGElement>) => void;
}

const Chats: React.FC<IChatsProps> = ({
  handleClickOpenModal,
}: IChatsProps) => {
  const { conversations } = useConversations();

  return (
    <div className="chats">
      <div className="chats-header">
        <span className="chats-header__title">Messages</span>
        <RiMailAddLine onClick={event => handleClickOpenModal(event)} />
      </div>
      <div className="chats-list">
        {conversations.length > 0 ? (
          conversations.map((item, index) => (
            <Chat key={item.recipient._id} user={item.recipient} index={index} />
          ))
        ) : (
            <div className="message-empty">
              <div className="message-empty__title">Send a message, get a message</div>
              <div className="message-empty__subtitle">Choose one from your existing messages, or start a new one.</div>
              <button
                onClick={event => handleClickOpenModal(event)}
                className="message-empty__button">
                Start a conversation
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Chats;
