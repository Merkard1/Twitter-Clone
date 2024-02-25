import { LoadingStatus } from '../../types';
import {
  IFetchDataOfTweetsAction,
  ISetLoadingStatusOfTweetsAction,
  ISetAddTweetFormStatusAction,
  IFetchAddTweetAction,
  IAddTweetAction,
  ISetDataOfTweetsAction,
  TweetsActionsType,
  IRemoveTweetAction,
  ILikeTweetAction,
  IUpdateLikesOfTweetAction,
  IFetchDataOfSpecificTweetsAction,
} from './contracts/actionTypes';
import { ITweetsState, ITweet, AddTweetFormStatus, TTweetsOption } from './contracts/state';

export const setLoadingStatusOfTweets = (payload: LoadingStatus): ISetLoadingStatusOfTweetsAction => ({
  type: TweetsActionsType.SET_LOADING_STATUS_OF_TWEETS,
  payload,
});

export const fetchDataOfTweets = (): IFetchDataOfTweetsAction => ({
  type: TweetsActionsType.FETCH_DATA_OF_TWEETS,
});

export const fetchDataOfSpecificTweets = (payload: TTweetsOption): IFetchDataOfSpecificTweetsAction => ({
  type: TweetsActionsType.FETCH_DATA_OF_SPECIFIC_TWEETS,
  payload,
});

export const setDataOfTweets = (payload: ITweetsState['items']): ISetDataOfTweetsAction => ({
  type: TweetsActionsType.SET_DATA_OF_TWEETS,
  payload,
});

export const setAddTweetFormStatus = (payload: AddTweetFormStatus): ISetAddTweetFormStatusAction => ({
  type: TweetsActionsType.SET_ADD_TWEET_FORM_STATUS,
  payload,
});

export const fetchAddTweet = (payload: {
  text: string,
  images: string[],
  replyingTo?: ITweet,
  retweet?: ITweet
}): IFetchAddTweetAction => ({
  type: TweetsActionsType.FETCH_ADD_TWEET,
  payload,
});

export const addTweet = (payload: ITweet): IAddTweetAction => ({
  type: TweetsActionsType.ADD_TWEET,
  payload,
});

export const removeTweet = (payload: string): IRemoveTweetAction => ({
  type: TweetsActionsType.REMOVE_TWEET,
  payload,
});

export const likeTweet = (payload: string): ILikeTweetAction => ({
  type: TweetsActionsType.LIKE_TWEET,
  payload,
});

export const updateLikesOfTweet = (payload: ITweet): IUpdateLikesOfTweetAction => ({
  type: TweetsActionsType.UPDATE_LIKES_OF_TWEET,
  payload,
});
