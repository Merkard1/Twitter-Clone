import { LoadingStatus } from '../../../types';

export interface ITag {
  _id: string;
  name: string;
  count: number;
}

export interface ITagsState {
  items: ITag[];
  loadingStatus: LoadingStatus;
}
