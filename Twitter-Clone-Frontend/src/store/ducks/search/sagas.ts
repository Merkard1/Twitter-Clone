import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UsersApi } from '../../../services/api/usersApi';
import { LoadingStatus } from '../../types';
import { setDataOfSearch, setLoadingStatusOfSearchAction } from './actionCreators';
import { ISearchUsersAction, SearchActionsType } from './contracts/actionTypes';

export function* searchUsersRequest({ payload }: ISearchUsersAction): SagaIterator {
  try {
    yield put(setLoadingStatusOfSearchAction(LoadingStatus.LOADING));
    const searchedUsers = yield call(UsersApi.searchUsers, payload);
    yield put(setDataOfSearch(searchedUsers));
  } catch (error) {
    yield put(setLoadingStatusOfSearchAction(LoadingStatus.ERROR));
  }
}

export function* searchSaga(): SagaIterator {
  yield takeLatest(SearchActionsType.SEARCH_USERS, searchUsersRequest);
}
