import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { AddTweetFormStatus, ITweetsState, ITweet, TTweetsOption } from './state';

export enum TweetsActionsType {
  SET_LOADING_STATUS_OF_TWEETS = 'tweets/SET_LOADING_STATUS_OF_TWEETS',
  FETCH_DATA_OF_TWEETS = 'tweets/FETCH_DATA_OF_TWEETS',
  FETCH_DATA_OF_SPECIFIC_TWEETS = 'tweets/FETCH_DATA_OF_SPECIFIC_TWEETS',
  SET_DATA_OF_TWEETS = 'tweets/SET_DATA_OF_TWEETS',
  SET_ADD_TWEET_FORM_STATUS = 'tweets/SET_ADD_TWEET_FORM_STATUS',
  FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
  ADD_TWEET = 'tweets/ADD_TWEET',
  REMOVE_TWEET = 'tweets/REMOVE_TWEET',
  LIKE_TWEET = 'tweets/LIKE_TWEET',
  UPDATE_LIKES_OF_TWEET = 'tweets/UPDATE_LIKES_OF_TWEET',
}

export interface ISetLoadingStatusOfTweetsAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_LOADING_STATUS_OF_TWEETS;
  payload: LoadingStatus;
}

export interface IFetchDataOfTweetsAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_DATA_OF_TWEETS;
}

export interface IFetchDataOfSpecificTweetsAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_DATA_OF_SPECIFIC_TWEETS;
  payload: TTweetsOption;
}

export interface ISetDataOfTweetsAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_DATA_OF_TWEETS;
  payload: ITweetsState['items'];
}

export interface ISetAddTweetFormStatusAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_ADD_TWEET_FORM_STATUS;
  payload: AddTweetFormStatus;
}

export interface IFetchAddTweetAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_ADD_TWEET;
  payload: { text: string, images: string[], replyingTo?: ITweet, retweet?: ITweet };
}

export interface IAddTweetAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.ADD_TWEET;
  payload: ITweet;
}

export interface IRemoveTweetAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.REMOVE_TWEET;
  payload: string;
}

export interface ILikeTweetAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.LIKE_TWEET;
  payload: string;
}

export interface IUpdateLikesOfTweetAction extends Action<TweetsActionsType> {
  type: TweetsActionsType.UPDATE_LIKES_OF_TWEET;
  payload: ITweet;
}

export type TweetsActions =
  | ISetLoadingStatusOfTweetsAction
  | IFetchDataOfTweetsAction
  | IFetchDataOfSpecificTweetsAction
  | ISetDataOfTweetsAction
  | IFetchAddTweetAction
  | IAddTweetAction
  | IRemoveTweetAction
  | ISetAddTweetFormStatusAction
  | ILikeTweetAction
  | IUpdateLikesOfTweetAction;
