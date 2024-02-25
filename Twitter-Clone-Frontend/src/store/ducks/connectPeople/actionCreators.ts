import { LoadingStatus } from '../../types';
import { IUser } from '../user/contracts/state';
import {
  ConnectPeopleActionsType,
  ISetLoadingStatusOfConnectPeopleAction,
  IFetchDataOfConnectPeopleAction,
  ISetDataOfConnectPeopleAction,
} from './contracts/actionTypes';

export const setLoadingStatusOfConnectPeopleAction = (
  payload: LoadingStatus
): ISetLoadingStatusOfConnectPeopleAction => ({
  type: ConnectPeopleActionsType.SET_LOADING_STATUS_OF_CONNECT_PEOPLE,
  payload,
});

export const fetchDataOfConnectPeople = (): IFetchDataOfConnectPeopleAction => ({
  type: ConnectPeopleActionsType.FETCH_DATA_OF_CONNECT_PEOPLE,
});

export const setDataOfConnectPeople = (payload: IUser[]): ISetDataOfConnectPeopleAction => ({
  type: ConnectPeopleActionsType.SET_DATA_OF_CONNECT_PEOPLE,
  payload,
});
