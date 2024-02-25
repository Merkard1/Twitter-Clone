import React from 'react';
import { BiSend } from 'react-icons/bi';
import { IRecipient } from '../../../../contexts/ConversationsProvider';
import './ConversationBar.scss';

interface IConversationBarProps {
  recipient: IRecipient;
  sender: IRecipient;
  sendMessage: (recipient: IRecipient, text: string, createdAt: Date, sender: IRecipient) => void;
}

const ConversationBar: React.FC<IConversationBarProps> = ({
  recipient,
  sender,
  sendMessage,
}: IConversationBarProps) => {
  const [draftRows, setDraftRows] = React.useState(1);
  const [text, setText] = React.useState<string>('');

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.rows = 1;
    const textareaLineHeight = 20;
    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
    event.target.rows = currentRows;
    setDraftRows(currentRows);
    if (event.currentTarget) {
      setText(event.currentTarget.value);
    }
  };

  const handleClickSendMessage = () => {
    const date = new Date();
    sendMessage(recipient, text, date, sender);
    setText('');
  };

  return (
    <div className="conversation-bar">
      <textarea
        className="add-tweet-form-content__textarea"
        rows={draftRows}
        id="draft-input"
        placeholder='Start a new message'
        onChange={handleChangeTextArea}
        value={text}
      ></textarea>
      <BiSend className={`${!text ? 'disabled' : ''}`} onClick={handleClickSendMessage} />
    </div>
  );
};

export default ConversationBar;
