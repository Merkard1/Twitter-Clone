import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { ITweetsState } from './ducks/tweets/contracts/state';
import { ITagsState } from './ducks/tags/contracts/state';
import { rootReducer } from './rootReducer';
import rootSaga from './saga';
import { ITweetState } from './ducks/tweet/contracts/state';
import { IUserState } from './ducks/user/contracts/state';
import { IConnectPeopleState } from './ducks/connectPeople/contracts/state';
import { ISearchState } from './ducks/search/contracts/state';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  // eslint-disable-next-line no-underscore-dangle
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  tweets: ITweetsState;
  tweet: ITweetState;
  tags: ITagsState;
  user: IUserState;
  connectPeople: IConnectPeopleState;
  search: ISearchState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
