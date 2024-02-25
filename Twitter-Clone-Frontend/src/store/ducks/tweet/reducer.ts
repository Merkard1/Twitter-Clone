import produce, { Draft } from 'immer';
import { TweetActions, TweetActionsType } from './contracts/actionTypes';
import { ITweetState } from './contracts/state';
import { LoadingStatus } from '../../types';

const initialTweetState: ITweetState = {
  data: undefined,
  loadingStatus: LoadingStatus.NEVER,
};

export const tweetReducer = produce((draft: Draft<ITweetState>, action: TweetActions) => {
  switch (action.type) {
    case TweetActionsType.FETCH_DATA_OF_TWEET:
      draft.data = undefined;
      draft.loadingStatus = LoadingStatus.LOADING;
      break;
    case TweetActionsType.SET_DATA_OF_TWEET:
      draft.data = action.payload;
      draft.loadingStatus = LoadingStatus.LOADED;
      break;
    case TweetActionsType.SET_LOADING_STATUS_OF_TWEET:
      draft.loadingStatus = action.payload;
      break;

    default:
      break;
  }
}, initialTweetState);
