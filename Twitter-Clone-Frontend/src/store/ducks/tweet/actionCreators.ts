import { LoadingStatus } from '../../types';
import {
  IFetchDataOfTweetAction,
  ISetLoadingStatusOfTweetAction,
  ISetDataOfTweetAction,
  TweetActionsType,
} from './contracts/actionTypes';
import { ITweetState } from './contracts/state';

export const fetchDataOfTweet = (payload: string): IFetchDataOfTweetAction => ({
  type: TweetActionsType.FETCH_DATA_OF_TWEET,
  payload,
});

export const setLoadingStatusOfTweet = (payload: LoadingStatus): ISetLoadingStatusOfTweetAction => ({
  type: TweetActionsType.SET_LOADING_STATUS_OF_TWEET,
  payload,
});

export const setDataOfTweet = (payload: ITweetState['data']): ISetDataOfTweetAction => ({
  type: TweetActionsType.SET_DATA_OF_TWEET,
  payload,
});
