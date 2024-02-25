import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TagsApi } from '../../../services/api/tagsApi';
import { LoadingStatus } from '../../types';
import { setTags, setTagsLoadingState, TagsActionsType } from './actionCreators';

export function* fetchTagsRequest(): SagaIterator {
  try {
    const items = yield call(TagsApi.fetchTags);
    yield put(setTags(items));
  } catch (error) {
    yield put(setTagsLoadingState(LoadingStatus.ERROR));
  }
}

export function* tagsSaga(): SagaIterator {
  yield takeEvery(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
