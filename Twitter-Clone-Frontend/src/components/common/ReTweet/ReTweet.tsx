import React from 'react';
import './ReTweet.scss';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import Avatar from '../../shared/Avatar/Avatar';
import { ITweet } from '../../../store/ducks/tweets/contracts/state';
import ImagesContainer from '../../shared/ImagesContainer/ImagesContainer';

interface IRetweetProps {
  retweet: ITweet;
}

const retweet: React.FC<IRetweetProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  retweet,
}: IRetweetProps) => {
  const history = useHistory();

  const handleClickReTweet = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    history.push(`/home/tweet/${retweet._id}`);
  };

  return (
    <div onClick={handleClickReTweet} className="retweet">
      <div className="header">
        <span className="header__avatar">
          <Avatar size='retweet' fullName={retweet.user?.fullName} avatar={retweet.user?.avatar} response={false} />
        </span>
        <span className="header__fullName">{retweet.user.fullName}</span>
        <span className="header__username">@{retweet.user.username}</span>
        <span className="header__time header__dot">·</span>
        <span className="header__time">{formatDate(new Date(retweet.createdAt))}</span>
      </div>

      <div className="content">
        <div className="content__text">
          {retweet.text}
        </div>
        {retweet.images && <ImagesContainer pictures={retweet.images} />}
      </div>
    </div>
  );
};

export default retweet;
