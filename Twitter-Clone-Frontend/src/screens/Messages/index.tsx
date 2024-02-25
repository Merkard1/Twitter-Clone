import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conversation from './components/conversation/Conversation';
import Chats from './components/chats/Chats';
import './index.scss';
import { fetchDataOfConnectPeople } from '../../store/ducks/connectPeople/actionCreators';
import { selectItemsOfConnectPeople } from '../../store/ducks/connectPeople/selectors';
import { selectDataOfUser } from '../../store/ducks/user/selectors';
import ModalWindow from '../../components/shared/ModalWindow/ModalWindow';
import NewChatModal from './components/newChatModal/NewChatModal';
import { IRecipient, useConversations } from '../../contexts/ConversationsProvider';

const Messages: React.FC = () => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const { conversations, selectedConversation, createConversation, sendMessage } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = React.useState<IRecipient[]>([]);

  let users = useSelector(selectItemsOfConnectPeople);
  const currentUserData = useSelector(selectDataOfUser);

  React.useEffect(() => {
    setSelectedContactIds(conversations.map(item => item.recipient));
  }, [conversations]);

  function handleCheckboxChange(contact: IRecipient) {
    setSelectedContactIds((prevSelectedContacts: IRecipient[]) => {
      if (prevSelectedContacts.some(item => item._id === contact._id)) {
        return prevSelectedContacts.filter(prevContact => contact._id !== prevContact._id);
      }

      return [...prevSelectedContacts, contact];
    });
  }

  const handleClickOpenModal = (event: React.MouseEvent<HTMLElement | SVGElement>) => {
    event.stopPropagation();
    setVisibleModal(true);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createConversation(selectedContactIds);
    handleCloseModal();
  };

  if (currentUserData) {
    users = users.filter(item => item._id !== currentUserData._id);
  }

  React.useEffect(() => {
    dispatch(fetchDataOfConnectPeople());
  }, []);

  return (
    <>
      <div className="messages">
        <Chats handleClickOpenModal={handleClickOpenModal} />
        <Conversation
          handleClickOpenModal={handleClickOpenModal}
          conversation={conversations[selectedConversation]}
          sendMessage={sendMessage}
        />
      </div>

      {visibleModal && (
        <ModalWindow onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            {users.map((item) => (
              <NewChatModal
                key={item._id}
                user={item}
                selectedContactIds={selectedContactIds}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
            <div className="newChatModal__button">
              <button>Submit</button>
            </div>
          </form>

        </ModalWindow>
      )}
    </>
  );
};

export default Messages;

