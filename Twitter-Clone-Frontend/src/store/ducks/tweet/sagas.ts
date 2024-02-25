import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TweetsApi } from '../../../services/api/tweetsApi';
import { setDataOfTweet, setLoadingStatusOfTweet } from './actionCreators';
import { IFetchDataOfTweetAction, TweetActionsType } from './contracts/actionTypes';
import { ITweet } from '../tweets/contracts/state';
import { LoadingStatus } from '../../types';


export function* fetchDataOfTweetRequest({ payload: tweetId }: IFetchDataOfTweetAction): SagaIterator {
  try {
    const data: ITweet = yield call(TweetsApi.fetchDataOfTweet, tweetId);
    yield put(setDataOfTweet(data));
  } catch (error) {
    yield put(setLoadingStatusOfTweet(LoadingStatus.ERROR));
  }
}

export function* tweetSaga(): SagaIterator {
  yield takeEvery(TweetActionsType.FETCH_DATA_OF_TWEET, fetchDataOfTweetRequest);
}
