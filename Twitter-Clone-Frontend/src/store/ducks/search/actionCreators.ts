import { LoadingStatus } from '../../types';

import { IUser } from '../user/contracts/state';
import {
  ISearchUsersAction,
  ISetDataOfSearchAction,
  ISetLoadingStatusOfSearchAction,
  SearchActionsType
} from './contracts/actionTypes';
import { ISearchUsers } from './contracts/state';

export const setLoadingStatusOfSearchAction = (
  payload: LoadingStatus
): ISetLoadingStatusOfSearchAction => ({
  type: SearchActionsType.SET_LOADING_STATUS_OF_SEARCH,
  payload,
});

export const searchUsers = (payload: ISearchUsers): ISearchUsersAction => ({
  type: SearchActionsType.SEARCH_USERS,
  payload,
});

export const setDataOfSearch = (payload: IUser[]): ISetDataOfSearchAction => ({
  type: SearchActionsType.SET_DATA_OF_SEARCH,
  payload,
});

