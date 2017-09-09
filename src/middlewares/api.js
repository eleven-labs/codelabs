/* eslint-disable arrow-parens */
import uuid from 'uuid';

import { CALL_API, Request } from '../services';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    types,
    payload,
    method = 'get',
    headers = {},
    credentials = 'omit',
  } = callAPI;

  let { endpoint } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  let request = {
    method,
    credentials,
    headers: {
      ...headers,
      'Content-Type': 'application/json;charset=UTF-8',
      'x-query-token': uuid.v4(),
    },
  };

  if (payload) {
    request = { ...request, body: JSON.stringify(payload) };
  }

  let response;

  try {
    response = await Request[method](endpoint, request);
    return next(actionWith({ response, type: successType }));
  } catch (error) {
    return next(actionWith({ type: failureType, error }));
  }
};
