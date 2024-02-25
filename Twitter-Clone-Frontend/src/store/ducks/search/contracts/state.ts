import { LoadingStatus } from '../../../types';
import { IUser } from '../../user/contracts/state';

export interface ISearchState {
  searchedUsers: IUser[];
  searchStatus: LoadingStatus;
}

export interface ISearchUsers {
  criteria: string;
}
