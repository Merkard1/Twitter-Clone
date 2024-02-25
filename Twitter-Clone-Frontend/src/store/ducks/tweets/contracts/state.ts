import { LoadingStatus } from '../../../types';

export enum AddTweetFormStatus {
  ADDED = 'ADDED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface ITweet {
  _id: string;
  text: string;
  createdAt: string;
  images?: [];
  replyingTo?: ITweet
  replies?: ITweet[]
  retweet?: ITweet;
  retweets?: ITweet[];
  likes: [];
  isFavorite: boolean;
  user: {
    _id: string;
    fullName: string;
    username: string;
    avatar: string;
  };
}

export interface ITweetsState {
  items: ITweet[];
  loadingStatus: LoadingStatus;
  addTweetFormStatus: AddTweetFormStatus;
}

export type TTweetsOption = 'following' | 'favorite';
