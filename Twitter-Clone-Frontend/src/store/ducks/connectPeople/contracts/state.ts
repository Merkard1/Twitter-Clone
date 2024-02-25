import { LoadingStatus } from '../../../types';
import { IUser } from '../../user/contracts/state';

export interface IConnectPeopleState {
  items: IUser[];
  connectPeopleStatus: LoadingStatus;
}
