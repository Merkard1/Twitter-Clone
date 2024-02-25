import React from 'react';
import Avatar from '../../../../components/shared/Avatar/Avatar';
import { IRecipient } from '../../../../contexts/ConversationsProvider';
import { IUser } from '../../../../store/ducks/user/contracts/state';
import './NewChatModal.scss';

interface INewChatModalProps {
  user: IUser;
  selectedContactIds: IRecipient[];
  handleCheckboxChange: (contact: IRecipient) => void;
}

const NewChatModal: React.FC<INewChatModalProps> = ({
  user,
  selectedContactIds,
  handleCheckboxChange,
}: INewChatModalProps) => {
  const recipient: IRecipient = {
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    avatar: user.avatar,
  };

  return (
    <div className="newChatModal" onClick={() => {
      handleCheckboxChange(recipient);
    }}>
      <div className="newChatModal-wrapper">
        <div className="newChatModal-avatar">
          <Avatar size='middle' fullName={user.fullName} avatar={user.avatar} id={user._id} response={true} />
        </div>
        <div className="newChatModal-desc">
          <span className="newChatModal__fullName">
            <a href={`/user/${user._id}`}>{user.fullName}</a>
          </span>
          <span className="newChatModal__username">@{user.username}</span>
        </div>
      </div>
      <input
        className="newChatModal__checkbox"
        type="checkbox"
        checked={selectedContactIds.some(item => item._id === recipient._id)}
        onChange={e => { e.stopPropagation(); }}
      />
    </div>
  );

};

export default NewChatModal;
