/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middlewares/api';
import reducer from '../reducers';
import { INITIAL_STATE } from '../constants';

let enhancer;

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(thunk, api, createLogger()),
  );
} else {
  enhancer = applyMiddleware(thunk, api, createLogger());
}

export default (initialState = INITIAL_STATE) => (
  createStore(reducer, initialState, enhancer)
);
