import resolve from '../helpers/resolve';
import update from '../helpers/update';
import { LOCAL_STORAGE_OPTIONS } from '../constants';

const actions = ['SET_CURRENT_COURSE', 'LOAD_STEP_SUCCESS'];

const getPersistedState = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    return json || {};
  } catch (ex) {
    console.log(ex);
    return {};
  }
};

const persistState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (ex) {
    console.log(ex);
  }
};

export default (options = LOCAL_STORAGE_OPTIONS) => store => next => action => {
  if (!actions.includes(action.type)) {
    next(action);
    return;
  }

  const { key, paths } = options;

  // 1. get current persisted state
  const persistedState = getPersistedState(key);

  next(action);

  // 2. get current local state
  const state = store.getState();

  // TODO: 3. select the related state to persist.
  // TODO: 4. compare the persisted state against the local related state.
  // TODO: 5. if different, then update.

  const newState = paths.reduce((acc, path) => (
    update({ ...acc }, path, () => {
      const value = resolve(state, path);

      if (typeof value !== 'undefined') {
        return value;
      }

      return resolve(persistedState, path);
    })
  ), {});

  persistState(key, newState);
};
