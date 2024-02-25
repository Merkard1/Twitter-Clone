import React, { useState } from 'react';
import './FullTweet.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import enLang from 'date-fns/locale/en-GB';
import { BsThreeDots } from 'react-icons/bs';
import { Menu, MenuItem } from '@material-ui/core';
import { selectStatusOfTweetIsLoading, selectDataOfTweet } from '../../../store/ducks/tweet/selectors';
import { removeTweet } from '../../../store/ducks/tweets/actionCreators';
import { fetchDataOfTweet, setDataOfTweet } from '../../../store/ducks/tweet/actionCreators';
import Avatar from '../../shared/Avatar/Avatar';
import ReTweet from '../ReTweet/ReTweet';
import TweetActions, { TModal } from '../../shared/TweetActions/TweetActions';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import AddTweetForm from '../AddTweetForm/AddTweetForm';
import Tweet from '../Tweet/Tweet';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { IUser } from '../../../store/ducks/user/contracts/state';
import CircularProgress from '../../shared/CircularProgress/CircularProgress';
import ImagesContainer from '../../shared/ImagesContainer/ImagesContainer';

const FullTweet: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tweetData = useSelector(selectDataOfTweet);
  const isLoading = useSelector(selectStatusOfTweetIsLoading);
  const [visibleModal, setVisibleModal] = React.useState<TModal>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser] = useLocalStorage('currentUser', []) as [IUser];
  const open = Boolean(anchorEl);
  const { id } = useParams() as { id?: string };

  React.useEffect(() => {
    if (id) {
      dispatch(fetchDataOfTweet(id));
    }

    return () => {
      dispatch(setDataOfTweet(undefined));
    };
  }, [dispatch, history.location]);

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

  const handleRemoveTweet = (event: React.MouseEvent<HTMLElement>): void => {
    handleCloseTweetMenu(event);
    if (id) {
      dispatch(removeTweet(id));
    }
    history.goBack();
  };

  const handleClickOpenModal = (event: React.MouseEvent<HTMLElement>, formType: TModal) => {
    event.stopPropagation();
    setVisibleModal(formType);
  };

  const handleCloseModal = () => {
    setVisibleModal(undefined);
    if (id) {
      dispatch(fetchDataOfTweet(id));
    }
  };

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (tweetData) {
    return (
      <>
        {tweetData.replyingTo && (<Tweet tweet={tweetData.replyingTo} isReply={true} />)}
        <div className="full-tweet">
          <div className={
            tweetData.replyingTo ? 'full-tweet-wrapper full-tweet-wrapper__reply' : 'full-tweet-wrapper'
          }>
            <div className="full-tweet-header">
              <div className="full-tweet-header__info">
                <div className="full-tweet-header__avatar">
                  <Avatar
                    size='middle'
                    fullName={tweetData.user.fullName}
                    avatar={tweetData.user.avatar}
                    id={tweetData.user._id}
                    response={true}
                  />
                </div>
                <div className="full-tweet-header__body">
                  <span className="full-tweet-header__fullName">
                    <a href={`/user/${tweetData.user._id}`}>{tweetData.user.fullName}</a>
                  </span>
                  <span className="full-tweet-header__username">@{tweetData.user.username}</span>
                </div>
              </div>
              <BsThreeDots onClick={handleOpenTweetMenu} className="full-tweet-header__button" />
              <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleCloseTweetMenu} >
                {currentUser._id === tweetData.user._id ? (
                  <MenuItem onClick={handleRemoveTweet}>Remove tweet</MenuItem>
                ) : (
                  <MenuItem onClick={event => event.stopPropagation()}>
                    Action is available only with your tweet
                  </MenuItem>
                )}
              </Menu>
            </div>

            <div className="full-tweet__body">
              <div className="full-tweet-content">
                <span className="full-tweet-content__text">
                  {tweetData.text}
                </span>
                {tweetData.images && <ImagesContainer pictures={tweetData.images} />}
                {tweetData.retweet && (
                  <ReTweet retweet={tweetData.retweet} />
                )}
              </div>
              <div className="full-tweet-footer">
                <div className="full-tweet-footer__date">
                  <span className="full-tweet-footer__title">{
                    format(new Date(tweetData.createdAt), 'H:mm', { locale: enLang })
                  } · </span>
                  <span className="full-tweet-footer__title">{
                    format(new Date(tweetData.createdAt), 'dd MMM. yyyy', { locale: enLang })
                  }</span>
                </div>

                <div className="full-tweet-footer__activity">
                  <div className="full-tweet-footer__activity-item">
                    <span className="full-tweet-footer__quantity">{tweetData.retweets?.length}</span>
                    <span className="full-tweet-footer__title">Retweets</span>
                  </div>
                  <div className="full-tweet-footer__activity-item">
                    <span className="full-tweet-footer__quantity">{tweetData.replies?.length}</span>
                    <span className="full-tweet-footer__title">Quote Tweets </span>
                  </div>
                  <div className="full-tweet-footer__activity-item">
                    <span className="full-tweet-footer__quantity">{tweetData.likes?.length}</span>
                    <span className="full-tweet-footer__title">Likes</span>
                  </div>
                </div>

                <TweetActions tweet={tweetData} handleClickOpenModal={handleClickOpenModal} actionsType='fullTweet' />
              </div>
            </div>
          </div>

          {tweetData.replies && tweetData.replies.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}

          {visibleModal && (
            <ModalWindow onClose={handleCloseModal}>
              {visibleModal === 'retweet' ? (
                <AddTweetForm defaultDraftRowsValue={2} formType={'retweet'} retweet={tweetData} />
              ) : (
                <AddTweetForm defaultDraftRowsValue={2} formType={'reply'} replyingTo={tweetData} />
              )}
            </ModalWindow>
          )}
        </div>
      </>
    );
  }

  return null;
};


export default FullTweet;
