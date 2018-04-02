import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import api from '../middlewares/api';
import algolia from '../middlewares/algolia';
import reducer from '../reducers';
import { INITIAL_STATE } from '../constants';

const enhancer = applyMiddleware(thunk, api, algolia);

export default (initialState = INITIAL_STATE) => (
  createStore(reducer, initialState, enhancer)
);
