import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TweetsApi } from '../../../services/api/tweetsApi';
import { AddTweetFormStatus } from './contracts/state';
import {
  addTweet,
  setAddTweetFormStatus,
  setDataOfTweets,
  setLoadingStatusOfTweets,
  updateLikesOfTweet,
} from './actionCreators';
import {
  IFetchAddTweetAction,
  IFetchDataOfSpecificTweetsAction,
  ILikeTweetAction,
  IRemoveTweetAction,
  TweetsActionsType,
} from './contracts/actionTypes';
import { LoadingStatus } from '../../types';
import { setDataOfTweet, setLoadingStatusOfTweet } from '../tweet/actionCreators';

export function* fetchDataOfTweetsRequest(): SagaIterator {
  try {
    const { pathname } = window.location;
    const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
    const items = yield call(TweetsApi.fetchDataOfTweets, userId);
    yield put(setDataOfTweets(items));
  } catch (error) {
    yield put(setLoadingStatusOfTweets(LoadingStatus.ERROR));
  }
}

export function* fetchDataOfSpecificTweetsRequest({ payload }: IFetchDataOfSpecificTweetsAction): SagaIterator {
  try {
    yield put(setLoadingStatusOfTweets(LoadingStatus.LOADING));
    const items = yield call(TweetsApi.fetchDataOfSpecificTweets, payload);
    yield put(setDataOfTweets(items));
  } catch (error) {
    yield put(setLoadingStatusOfTweets(LoadingStatus.ERROR));
  }
}

export function* fetchAddTweetRequest({ payload }: IFetchAddTweetAction): SagaIterator {
  try {
    const item = yield call(TweetsApi.addTweet, payload);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddTweetFormStatus(AddTweetFormStatus.ERROR));
  }
}

export function* fetchRemoveTweetRequest({ payload }: IRemoveTweetAction): SagaIterator {
  try {
    yield call(TweetsApi.removeTweet, payload);
  } catch (error) {
    yield put(setLoadingStatusOfTweet(LoadingStatus.ERROR));
  }
}

export function* fetchLikeTweetRequest({ payload }: ILikeTweetAction): SagaIterator {
  try {
    yield put(setLoadingStatusOfTweet(LoadingStatus.LOADING));
    const item = yield call(TweetsApi.likeTweet, payload);
    yield put(updateLikesOfTweet(item));
    yield put(setDataOfTweet(item));
  } catch (error) {
    yield put(setLoadingStatusOfTweet(LoadingStatus.ERROR));
  }
}

export function* tweetsSaga(): SagaIterator {
  yield takeLatest(TweetsActionsType.FETCH_DATA_OF_TWEETS, fetchDataOfTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_DATA_OF_SPECIFIC_TWEETS, fetchDataOfSpecificTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequest);
  yield takeLatest(TweetsActionsType.LIKE_TWEET, fetchLikeTweetRequest);
}
