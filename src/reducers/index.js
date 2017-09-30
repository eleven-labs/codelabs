import { LOAD_COURSES_SUCCESS } from '../actions';

const handleActions = cases => (state = {}, action) => (
  (!action || !cases[action.type]) ? state : cases[action.type](state, action)
);

export default handleActions({
  [LOAD_COURSES_SUCCESS]: (state, action) => ({
    courses: [
      ...(state.courses || []),
      ...action.response,
    ],
  }),
});
