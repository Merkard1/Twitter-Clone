import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { IUser } from '../../user/contracts/state';

export enum ConnectPeopleActionsType {
  SET_LOADING_STATUS_OF_CONNECT_PEOPLE = 'connect_people/SET_LOADING_STATUS_OF_CONNECT_PEOPLE',
  FETCH_DATA_OF_CONNECT_PEOPLE = 'connect_people/FETCH_DATA_OF_CONNECT_PEOPLE',
  SET_DATA_OF_CONNECT_PEOPLE = 'connect_people/SET_DATA_OF_CONNECT_PEOPLE',
}

export interface ISetLoadingStatusOfConnectPeopleAction extends Action<ConnectPeopleActionsType> {
  type: ConnectPeopleActionsType.SET_LOADING_STATUS_OF_CONNECT_PEOPLE;
  payload: LoadingStatus;
}

export interface IFetchDataOfConnectPeopleAction extends Action<ConnectPeopleActionsType> {
  type: ConnectPeopleActionsType.FETCH_DATA_OF_CONNECT_PEOPLE;
}

export interface ISetDataOfConnectPeopleAction extends Action<ConnectPeopleActionsType> {
  type: ConnectPeopleActionsType.SET_DATA_OF_CONNECT_PEOPLE;
  payload: IUser[];
}

export type ConnectPeopleActions =
  | ISetLoadingStatusOfConnectPeopleAction
  | IFetchDataOfConnectPeopleAction
  | ISetDataOfConnectPeopleAction;
