import React, { useState } from 'react';
import './AddTweetForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCalendar } from 'react-icons/hi';
import { CgPoll } from 'react-icons/cg';
import { FiSmile } from 'react-icons/fi';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectAddTweetFormStatus } from '../../../store/ducks/tweets/selectors';
import { fetchAddTweet } from '../../../store/ducks/tweets/actionCreators';
import { AddTweetFormStatus, ITweet } from '../../../store/ducks/tweets/contracts/state';
import { uploadImage } from '../../../utils/uploadImage';
import { selectDataOfUser } from '../../../store/ducks/user/selectors';
import Avatar from '../../shared/Avatar/Avatar';
import ReTweet from '../ReTweet/ReTweet';
import Reply from '../Reply/Reply';
import ImagesContainer from '../../shared/ImagesContainer/ImagesContainer';

type TForm = 'reply' | 'retweet';

interface IAddTweetFormProps {
  defaultDraftRowsValue: number;
  formType?: TForm;
  replyingTo?: ITweet;
  retweet?: ITweet;
}

export interface IImageObj {
  blobUrl: string;
  file: File;
}

const AddTweetForm: React.FC<IAddTweetFormProps> = ({
  defaultDraftRowsValue,
  formType,
  replyingTo,
  retweet,
}: IAddTweetFormProps) => {
  const MAX_LENGTH = 280;
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [draftRows, setDraftRows] = useState(defaultDraftRowsValue);
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<IImageObj[]>([]);
  const currentUserData = useSelector(selectDataOfUser);
  const addFormState = useSelector(selectAddTweetFormStatus);
  const textLimitPercent: number = (text.length / MAX_LENGTH) * 100;
  const textCounter = MAX_LENGTH - text.length;
  let placeholder;
  let buttonText;

  switch (formType) {
    case 'reply':
      placeholder = 'Tweet your reply';
      buttonText = 'Reply';
      break;
    case 'retweet':
      placeholder = 'Add a comment';
      buttonText = 'Retweet';
      break;
    default:
      placeholder = "What's happening?";
      buttonText = 'Tweet';
  }

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.rows = defaultDraftRowsValue;
    const textareaLineHeight = 25;
    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
    event.target.rows = currentRows;
    setDraftRows(currentRows);
    if (event.currentTarget) {
      setText(event.currentTarget.value);
    }
  };

  const handleClickImageIcon = () => {
    if (inputRef.current && images.length < 2) {
      inputRef.current.click();
    }
  };

  const handleChangeFileInput = React.useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const fileObj = new Blob([file]);
        setImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);

  const handleClickAddTweet = async (): Promise<void> => {
    const imagesList = [] as string[];

    await Promise.all(images.map(async (item) => {
      const { file } = item;
      const { url } = await uploadImage(file, 'tweetImage');
      imagesList.push(url);
    }));

    dispatch(fetchAddTweet({ text, images: imagesList, replyingTo, retweet }));
    setText('');
    setImages([]);
  };

  return (
    <div className="add-tweet-form">
      {replyingTo && (
        <div className="add-tweet-form-content__reply">
          <Reply tweet={replyingTo} />
        </div>
      )}

      <div className="add-tweet-form-wrapper">
        <div className="add-tweet-form-avatar">
          <Avatar
            size='middle'
            fullName={currentUserData?.fullName}
            avatar={currentUserData?.avatar}
            id={currentUserData?._id}
            response={true}
          />
        </div>

        <div className="add-tweet-form-content">
          <textarea
            className="add-tweet-form-content__textarea"
            rows={draftRows}
            id="draft-input"
            placeholder={placeholder}
            onChange={handleChangeTextArea}
            value={text}
          ></textarea>

          <ImagesContainer imagesPreview={images} removeImage={removeImage} />

          {retweet && (
            <div className="add-tweet-form-content__retweet">
              <ReTweet retweet={retweet} />
            </div>
          )}

          <div className="actions">
            <div className="actions-wrapper">
              <div
                className={images.length > 1 ? "actions-icon actions-icon__image" : "actions-icon"}
                onClick={handleClickImageIcon}>
                <input ref={inputRef} type="file" id="upload-input" style={{ display: 'none' }} />
                <ImageOutlinedIcon />
              </div>
              <div className="actions-icon">
                <FiSmile />
              </div>
              <div className="actions-icon">
                <CgPoll />
              </div>
              <div className="actions-icon">
                <HiOutlineCalendar />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="actions-wrapper">
                {text && (
                  <>
                    <span className="actions__text-quantity">{textCounter}</span>
                    <div className="actions__circular-progress">
                      <CircularProgress
                        variant="determinate"
                        size={20}
                        thickness={5}
                        value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                        style={text.length >= MAX_LENGTH ?
                          { color: 'rgb(178,34,34)' } :
                          { color: 'var(--primaryTheme)' }}
                      />
                      {(text.length) && (
                        <CircularProgress
                          style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                          variant="determinate"
                          size={20}
                          thickness={6}
                          value={100}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={handleClickAddTweet}
                disabled={addFormState === AddTweetFormStatus.LOADING || !text || text.length >= MAX_LENGTH}
                className="actions__button"
              >
                {addFormState === AddTweetFormStatus.LOADING ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTweetForm;
