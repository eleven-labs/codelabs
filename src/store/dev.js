/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middlewares/api';
import algolia from '../middlewares/algolia';
import localStorageMiddleware from '../middlewares/local-storage';
import reducer from '../reducers';

let enhancer;

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(
      thunk,
      api,
      algolia,
      createLogger(),
      localStorageMiddleware(),
    ),
  );
} else {
  enhancer = applyMiddleware(thunk, api, createLogger());
}

export default (initialState = {}) => (
  createStore(reducer, initialState, enhancer)
);
