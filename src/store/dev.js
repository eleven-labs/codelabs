/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import { INITIAL_STATE } from '../constants';

let enhancer;

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk));
} else {
  enhancer = applyMiddleware(thunk);
}

export default (initialState = INITIAL_STATE) => (
  createStore(reducer, initialState, enhancer)
);
