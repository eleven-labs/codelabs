import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import api from '../middlewares/api';
import algolia from '../middlewares/algolia';
import reducer from '../reducers';
import localStorageMiddleware from '../middlewares/local-storage';

const enhancer = applyMiddleware(thunk, api, algolia, localStorageMiddleware());

export default (initialState = {}) => (
  createStore(reducer, initialState, enhancer)
);
