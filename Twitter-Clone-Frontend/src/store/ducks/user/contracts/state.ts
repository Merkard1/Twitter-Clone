import { LoadingStatus } from '../../../types';
import { ITweet } from '../../tweets/contracts/state';

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  biography?: string;
  background?: string;
  avatar?: string;
  createdAt: string;
  followingUsers: string[];
  followers: string[];
  favoriteTweets: ITweet[];
}

export interface IUpdateDataOfUser {
  fullName?: string;
  biography?: string;
  background?: File[] | string;
  avatar?: File[] | string;
}

export interface IFollowUser {
  followedByMeUserId: string;
}

export interface IUserState {
  data: IUser | undefined;
  loadingStatus: LoadingStatus;
}
