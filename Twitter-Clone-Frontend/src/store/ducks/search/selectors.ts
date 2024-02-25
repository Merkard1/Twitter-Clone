import { RootState } from '../../store';
import { IUser } from '../user/contracts/state';
import { ISearchState } from './contracts/state';

export const selectStateOfSearch = (state: RootState): ISearchState => state.search;

export const selectUsersOfSearch = (state: RootState): IUser[] => selectStateOfSearch(state).searchedUsers;
