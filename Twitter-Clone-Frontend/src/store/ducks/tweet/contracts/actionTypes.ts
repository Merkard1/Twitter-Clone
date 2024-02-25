import { Action } from 'redux';
import { ITweetState } from './state';
import { LoadingStatus } from '../../../types';

export enum TweetActionsType {
  FETCH_DATA_OF_TWEET = 'tweet/FETCH_DATA_OF_TWEET',
  SET_LOADING_STATUS_OF_TWEET = 'tweet/SET_LOADING_STATUS_OF_TWEET',
  SET_DATA_OF_TWEET = 'tweet/SET_DATA_OF_TWEET',
}

export interface IFetchDataOfTweetAction extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_DATA_OF_TWEET;
  payload: string;
}

export interface ISetLoadingStatusOfTweetAction extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LOADING_STATUS_OF_TWEET;
  payload: LoadingStatus;
}

export interface ISetDataOfTweetAction extends Action<TweetActionsType> {
  type: TweetActionsType.SET_DATA_OF_TWEET;
  payload: ITweetState['data'];
}

export type TweetActions =
  | IFetchDataOfTweetAction
  | ISetLoadingStatusOfTweetAction
  | ISetDataOfTweetAction;
