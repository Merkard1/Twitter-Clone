import { ITweet } from '../../tweets/contracts/state';
import { LoadingStatus } from '../../../types';

export interface ITweetState {
  data?: ITweet;
  loadingStatus: LoadingStatus;
}
