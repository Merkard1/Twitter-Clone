import React from 'react';
import './Tweet.scss';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { Menu, MenuItem } from '@material-ui/core';
import { removeTweet } from '../../../store/ducks/tweets/actionCreators';
import { formatDate } from '../../../utils/formatDate';
import Avatar from '../../shared/Avatar/Avatar';
import { ITweet } from '../../../store/ducks/tweets/contracts/state';
import ReTweet from '../ReTweet/ReTweet';
import TweetActions, { TModal } from '../../shared/TweetActions/TweetActions';
import AddTweetForm from '../AddTweetForm/AddTweetForm';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { IUser } from '../../../store/ducks/user/contracts/state';
import ImagesContainer from '../../shared/ImagesContainer/ImagesContainer';

interface ITweetProps {
  tweet: ITweet
  isReply?: boolean
}

const Tweet: React.FC<ITweetProps> = ({
  tweet,
  isReply,
}: ITweetProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [visibleModal, setVisibleModal] = React.useState<TModal>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentUser] = useLocalStorage('currentUser', []) as [IUser];
  const open = Boolean(anchorEl);

  const handleClickTweet = () => {
    history.push(`/home/tweet/${tweet._id}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenTweetMenu = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseTweetMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleRemoveTweet = (event: React.MouseEvent<HTMLElement>) => {
    handleCloseTweetMenu(event);
    dispatch(removeTweet(tweet._id));
  };

  const handleClickOpenModal = (event: React.MouseEvent<HTMLElement>, formType: TModal) => {
    event.stopPropagation();
    setVisibleModal(formType);
  };

  const handleCloseModal = () => {
    setVisibleModal(undefined);
  };

  return (
    <div className="tweet">
      <div onClick={handleClickTweet} className={isReply ? 'tweet-wrapper tweet-wrapper__reply' : 'tweet-wrapper'}>
        <div className="tweet-avatar">
          <Avatar size='middle' fullName={tweet.user?.fullName} avatar={tweet.user?.avatar} response={false} />
          {isReply && (
            <div className="tweet__line" />
          )}
        </div>

        <div className="tweet-content">
          <div className="tweet-desc">
            <div>
              <span className="tweet-desc__fullName">
                <a href={`/user/${tweet.user._id}`}>{tweet.user.fullName}</a>
              </span>
              <span className="tweet-desc__username">@{tweet.user.username}</span>
              <span className="tweet-desc__time tweet-desc__dot">·</span>
              <span className="tweet-desc__time">{formatDate(new Date(tweet.createdAt))}</span>
            </div>
            <BsThreeDots onClick={handleOpenTweetMenu} className="tweet-header__button" />
            <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleCloseTweetMenu} >
              {currentUser._id === tweet.user._id ? (
                <MenuItem onClick={handleRemoveTweet}>Remove tweet</MenuItem>
              ) : (
                <MenuItem onClick={event => event.stopPropagation()}>Action is available only with your tweet</MenuItem>
              )}
            </Menu>
          </div>

          <div className="tweet-body">
            {tweet.replyingTo ? (
              <div className="tweet-body__reply">
                <span className="reply-body__replyingTo">
                  Replying to <a href={`/user/${tweet.replyingTo.user._id}`}>@{tweet.replyingTo.user.username}</a>
                </span>
                <span className="tweet-body__text">
                  {tweet.text}
                </span>
              </div>
            ) : (
              <span className="tweet-body__text">
                {tweet.text}
                {tweet.images && <ImagesContainer pictures={tweet.images} />}
              </span>
            )}
            {tweet.retweet && (
              <div className="tweet-body__retweet">
                <ReTweet retweet={tweet.retweet} />
              </div>
            )}
          </div>

          <TweetActions tweet={tweet} handleClickOpenModal={handleClickOpenModal} />
        </div>
      </div>

      {
        visibleModal && (
          <ModalWindow onClose={handleCloseModal}>
            {visibleModal === 'retweet' ? (
              <AddTweetForm defaultDraftRowsValue={2} formType={'retweet'} retweet={tweet} />
            ) : (
              <AddTweetForm defaultDraftRowsValue={2} formType={'reply'} replyingTo={tweet} />
            )}
          </ModalWindow>
        )
      }
    </div >
  );
};

export default Tweet;
