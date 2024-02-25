import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UsersApi } from '../../../services/api/usersApi';
import { LoadingStatus } from '../../types';
import { setDataOfConnectPeople, setLoadingStatusOfConnectPeopleAction } from './actionCreators';
import { ConnectPeopleActionsType } from './contracts/actionTypes';

export function* fetchConnectPeopleRequest(): SagaIterator {
  try {
    yield put(setLoadingStatusOfConnectPeopleAction(LoadingStatus.LOADING));
    const items = yield call(UsersApi.getPeople);
    yield put(setDataOfConnectPeople(items));
  } catch (error) {
    yield put(setLoadingStatusOfConnectPeopleAction(LoadingStatus.ERROR));
  }
}

export function* connectPeopleSaga(): SagaIterator {
  yield takeLatest(ConnectPeopleActionsType.FETCH_DATA_OF_CONNECT_PEOPLE, fetchConnectPeopleRequest);
}
