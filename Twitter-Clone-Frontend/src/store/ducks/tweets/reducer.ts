import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { TweetsActions, TweetsActionsType } from './contracts/actionTypes';
import { ITweetsState, AddTweetFormStatus } from './contracts/state';

const initialTweetsState: ITweetsState = {
  items: [],
  addTweetFormStatus: AddTweetFormStatus.NEVER,
  loadingStatus: LoadingStatus.NEVER,
};

export const tweetsReducer = produce((draft: Draft<ITweetsState>, action: TweetsActions) => {
  switch (action.type) {
    case TweetsActionsType.SET_LOADING_STATUS_OF_TWEETS:
      draft.loadingStatus = action.payload;
      break;
    case TweetsActionsType.FETCH_DATA_OF_TWEETS:
      draft.items = [];
      draft.loadingStatus = LoadingStatus.LOADING;
      break;
    case TweetsActionsType.SET_DATA_OF_TWEETS:
      draft.items = action.payload;
      draft.loadingStatus = LoadingStatus.LOADED;
      break;
    case TweetsActionsType.SET_ADD_TWEET_FORM_STATUS:
      draft.addTweetFormStatus = action.payload;
      break;
    case TweetsActionsType.FETCH_ADD_TWEET:
      draft.addTweetFormStatus = AddTweetFormStatus.LOADING;
      break;
    case TweetsActionsType.ADD_TWEET:
      draft.items.unshift(action.payload);
      draft.addTweetFormStatus = AddTweetFormStatus.ADDED;
      break;
    case TweetsActionsType.REMOVE_TWEET:
      draft.items = draft.items.filter(item => item._id !== action.payload);
      break;
    case TweetsActionsType.UPDATE_LIKES_OF_TWEET:
      draft.items.forEach(item => {
        if (item._id === action.payload._id) {
          item.likes = action.payload.likes;
          item.isFavorite = action.payload.isFavorite;
        }
      });
      break;

    default:
      break;
  }
}, initialTweetsState);
