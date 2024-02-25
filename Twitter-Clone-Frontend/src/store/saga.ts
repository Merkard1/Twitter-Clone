import { all } from 'redux-saga/effects';
import { tweetsSaga } from './ducks/tweets/sagas';
import { tweetSaga } from './ducks/tweet/sagas';
import { tagsSaga } from './ducks/tags/sagas';
import { userSaga } from './ducks/user/sagas';
import { connectPeopleSaga } from './ducks/connectPeople/sagas';
import { searchSaga } from './ducks/search/sagas';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([tweetsSaga(), tweetSaga(), tagsSaga(), userSaga(), connectPeopleSaga(), searchSaga()]);
}
