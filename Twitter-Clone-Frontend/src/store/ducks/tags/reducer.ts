import produce, { Draft } from 'immer';
import { TagsActions, TagsActionsType } from './actionCreators';
import { ITagsState } from './contracts/state';
import { LoadingStatus } from '../../types';

const initialTagsState: ITagsState = {
  items: [],
  loadingStatus: LoadingStatus.NEVER,
};

export const tagsReducer = produce((draft: Draft<ITagsState>, action: TagsActions) => {
  switch (action.type) {
    case TagsActionsType.FETCH_TAGS:
      draft.items = [];
      draft.loadingStatus = LoadingStatus.LOADING;
      break;
    case TagsActionsType.SET_TAGS:
      draft.items = action.payload;
      draft.loadingStatus = LoadingStatus.LOADED;
      break;
    case TagsActionsType.SET_LOADING_STATE:
      draft.loadingStatus = action.payload;
      break;

    default:
      break;
  }
}, initialTagsState);
