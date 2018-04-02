import { CALL_ALGOLIA_API, search } from '../services';

// A Redux middleware that interprets actions with CALL_ALGOLIA_API info specified.
// Performs the call and promises when such actions are dispatched.
export default () => next => async action => {
  const callAlgoliaAPI = action[CALL_ALGOLIA_API];

  if (typeof callAlgoliaAPI === 'undefined') {
    return next(action);
  }

  const {
    types,
    params = {},
  } = callAlgoliaAPI;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_ALGOLIA_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  let response;

  try {
    response = await search(params);
    return next(actionWith({ response, type: successType }));
  } catch (error) {
    return next(actionWith({ type: failureType, error }));
  }
};
