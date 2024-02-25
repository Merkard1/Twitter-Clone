import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { ITagsState } from './contracts/state';
import { LoadingStatus } from '../../types';

export const selectTags = (state: RootState): ITagsState => state.tags;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectTags(state).loadingStatus;

export const selectAreTagsLoading = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectAreTagsLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;

export const selectTagsItems = createSelector(selectTags, tags => tags.items);
