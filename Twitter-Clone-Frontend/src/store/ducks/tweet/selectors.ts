import { RootState } from '../../store';
import { ITweet } from '../tweets/contracts/state';
import { LoadingStatus } from '../../types';
import { ITweetState } from './contracts/state';

export const selectStateOfTweet = (state: RootState): ITweetState => state.tweet;

export const selectLoadingStatusOfTweet = (state: RootState): LoadingStatus => selectStateOfTweet(state).loadingStatus;

export const selectStatusOfTweetIsLoading = (state: RootState): boolean =>
  selectLoadingStatusOfTweet(state) === LoadingStatus.LOADING;

export const selectStatusOfTweetIsLoaded = (state: RootState): boolean =>
  selectLoadingStatusOfTweet(state) === LoadingStatus.LOADED;

export const selectDataOfTweet = (state: RootState): ITweet | undefined => selectStateOfTweet(state).data;
