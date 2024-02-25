import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { IUser } from '../../user/contracts/state';
import { ISearchUsers } from './state';

export enum SearchActionsType {
  SET_LOADING_STATUS_OF_SEARCH = 'search/SET_LOADING_STATUS_OF_SEARCH',
  SEARCH_USERS = 'search/SEARCH_USERS',
  SET_DATA_OF_SEARCH = 'search/SET_DATA_OF_SEARCH',
}

export interface ISetLoadingStatusOfSearchAction extends Action<SearchActionsType> {
  type: SearchActionsType.SET_LOADING_STATUS_OF_SEARCH;
  payload: LoadingStatus;
}

export interface ISearchUsersAction extends Action<SearchActionsType> {
  type: SearchActionsType.SEARCH_USERS;
  payload: ISearchUsers;
}

export interface ISetDataOfSearchAction extends Action<SearchActionsType> {
  type: SearchActionsType.SET_DATA_OF_SEARCH;
  payload: IUser[];
}

export type ConnectPeopleActions =
  | ISetLoadingStatusOfSearchAction
  | ISearchUsersAction
  | ISetDataOfSearchAction;
