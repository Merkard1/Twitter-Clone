import React from 'react';
import Avatar from '../../../../components/shared/Avatar/Avatar';
import { IRecipient, useConversations } from '../../../../contexts/ConversationsProvider';
import './Chat.scss';

interface IChatProps {
  user: IRecipient;
  index: number;
}

const Chat: React.FC<IChatProps> = ({
  user,
  index,
}: IChatProps) => {
  const { selectedConversation, selectConversationIndex } = useConversations();

  return (
    <div
      className={`chat ${index === selectedConversation ? 'chat--active' : ''}`}
      onClick={() => selectConversationIndex(index)}
    >
      <div className="chat-avatar">
        <Avatar size='middle' fullName={user.fullName} avatar={user.avatar} id={user._id} response={true} />
      </div>
      <div className="chat-desc">
        <span className="chat__fullName">
          <a href={`/user/${user._id}`}>{user.fullName}</a>
        </span>
        <span className="chat__username">@{user.username}</span>
      </div>
    </div>
  );
};

export default Chat;
