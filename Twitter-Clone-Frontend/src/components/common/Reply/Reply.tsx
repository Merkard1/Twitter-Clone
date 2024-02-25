import React from 'react';
import './Reply.scss';

import { formatDate } from '../../../utils/formatDate';
import Avatar from '../../shared/Avatar/Avatar';
import { ITweet } from '../../../store/ducks/tweets/contracts/state';

interface ITweetProps {
  tweet: ITweet
}

const Reply: React.FC<ITweetProps> = ({
  tweet,
}: ITweetProps) => (
  <div className="reply">
    <div className="reply-avatar">
      <Avatar size='middle' fullName={tweet.user?.fullName} avatar={tweet.user?.avatar} response={false} />
      <div className="reply__line" />
    </div>

    <div className="reply-content">
      <div className="reply-desc">
        <div>
          <span className="reply-desc__fullName">
            <a href={`/user/${tweet.user._id}`}>{tweet.user.fullName}</a>
          </span>
          <span className="reply-desc__username">@{tweet.user.username}</span>
          <span className="reply-desc__time reply-desc__dot">·</span>
          <span className="reply-desc__time">{formatDate(new Date(tweet.createdAt))}</span>
        </div>
      </div>

      <div className="reply-body">
        <span className="reply-body__text">
          {tweet.text}
        </span>
        <span className="reply-body__replyingTo">
          Replying to <a href={`/user/${tweet.user._id}`}>@{tweet.user.username}</a>
        </span>
      </div>
    </div>
  </div>
);

export default Reply;
