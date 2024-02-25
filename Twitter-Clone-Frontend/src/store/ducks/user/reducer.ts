import produce, { Draft } from 'immer';
import { UserActions, UserActionsType } from './contracts/actionTypes';

import { IUserState } from './contracts/state';
import { LoadingStatus } from '../../types';

const initialTweetState: IUserState = {
  data: undefined,
  loadingStatus: LoadingStatus.NEVER,
};

export const userReducer = produce((draft: Draft<IUserState>, action: UserActions) => {
  switch (action.type) {
    case UserActionsType.SET_LOADING_STATUS_OF_USER:
      draft.loadingStatus = action.payload;
      break;
    case UserActionsType.SET_DATA_OF_USER:
      draft.data = action.payload;
      draft.loadingStatus = LoadingStatus.SUCCESS;
      break;
    case UserActionsType.SIGN_OUT:
      draft.data = undefined;
      draft.loadingStatus = LoadingStatus.LOADED;
      break;

    default:
      break;
  }
}, initialTweetState);
