import { RootState } from '../../store';
import { IUser } from '../user/contracts/state';
import { IConnectPeopleState } from './contracts/state';

export const selectStateOfConnectPeople = (state: RootState): IConnectPeopleState => state.connectPeople;

export const selectItemsOfConnectPeople = (state: RootState): IUser[] => selectStateOfConnectPeople(state).items;
