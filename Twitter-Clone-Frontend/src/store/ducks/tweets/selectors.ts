import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { ITweetsState, AddTweetFormStatus, ITweet } from './contracts/state';

export const selectStateOfTweets = (state: RootState): ITweetsState => state.tweets;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectStateOfTweets(state).loadingStatus;

export const selectAddTweetFormStatus = (state: RootState): AddTweetFormStatus =>
  selectStateOfTweets(state).addTweetFormStatus;

export const selectStatusOfTweetsIsLoading = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectStatusOfTweetsIsLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;

export const selectItemsOfTweets = (state: RootState): ITweet[] => selectStateOfTweets(state).items;
