import React from 'react';
import { format } from 'date-fns';
import enLang from 'date-fns/locale/en-GB';
import Avatar from '../../../../components/shared/Avatar/Avatar';
import { IConversation, IRecipient } from '../../../../contexts/ConversationsProvider';
import { IUser } from '../../../../store/ducks/user/contracts/state';
import './Conversation.scss';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import ConversationBar from '../conversationBar/ConversationBar';

interface IConversationProps {
  conversation?: IConversation;
  handleClickOpenModal: (event: React.MouseEvent<HTMLElement | SVGElement>) => void;
  sendMessage: (recipient: IRecipient, text: string, createdAt: Date, sender: IRecipient) => void;
}

const Conversation: React.FC<IConversationProps> = ({
  conversation,
  handleClickOpenModal,
  sendMessage,
}: IConversationProps) => {
  if (conversation) {
    const { recipient, messages } = conversation;
    const [currentUser] = useLocalStorage('currentUser', []) as [IUser];

    const sender: IRecipient = {
      _id: currentUser._id,
      fullName: currentUser.fullName,
      username: currentUser.username,
      avatar: currentUser.avatar,
    };

    const setRef = React.useCallback(node => {
      if (node) {
        node.scrollIntoView({ smooth: true });
      }
    }, []);

    return (
      < div className="conversation" >
        <div className="conversation-wrapper" >
          <div className="conversation-header">
            <div className="conversation-avatar">
              <Avatar
                size='small'
                fullName={recipient.fullName}
                avatar={recipient.avatar}
                id={recipient._id}
                response={true}
              />
            </div>
            <div className="conversation-desc">
              <div className="conversation__fullName">
                <a href={`/user/${recipient._id}`}>{recipient.fullName}</a>
              </div>
              <div className="conversation__username">@{recipient.username}</div>
            </div>
          </div>
          <div className="conversation-dashboard">
            {messages.map((item, index) => {
              const lastMessage = messages.length - 1 === index;
              if (item.sender._id === currentUser._id) {
                return (
                  <div key={index}
                    ref={lastMessage ? setRef : null}
                    className="conversation-dashboard-message-wrapper message--user"
                  >
                    <div className="conversation-dashboard-message">
                      <div className="conversation-dashboard-message__text">{item.text}</div>
                      <div className="conversation-dashboard-message__time">
                        {format(new Date(item.createdAt), 'hh:mm aa', { locale: enLang })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  ref={lastMessage ? setRef : null}
                  className="conversation-dashboard-message-wrapper message--recipient"
                >
                  <div className="conversation-dashboard-message">
                    <div className="conversation-dashboard-message__container">
                      <div className="conversation-dashboard-message__avatar">
                        <Avatar
                          size='small'
                          fullName={recipient.fullName}
                          avatar={recipient.avatar}
                          id={recipient._id}
                          response={true}
                        />
                      </div>
                      <div className="conversation-dashboard-message__text">{item.text}</div>
                    </div>
                    <div className="conversation-dashboard-message__time">
                      {format(new Date(item.createdAt), 'hh:mm aa', { locale: enLang })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ConversationBar recipient={recipient} sender={sender} sendMessage={sendMessage} />
        </div >
      </div>
    );
  } return (
    < div className="conversation" >
      <div className="message-empty">
        <div className="message-empty__title">You don’t have a message selected</div>
        <div className="message-empty__subtitle">
          Direct Messages are private conversations
          between you and other people on Twitter. Share Tweets,
          media, and more!
        </div>
        <button
          onClick={event => handleClickOpenModal(event)}
          className="message-empty__button">
          New message
        </button>
      </div >
    </div >
  );
};

export default Conversation;
