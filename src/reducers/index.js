import { LOAD_COURSES_SUCCESS } from '../actions';
import { INITIAL_STATE } from '../constants';

const handleActions = cases => (state = INITIAL_STATE, action) => (
  (!action || !cases[action.type]) ? state : cases[action.type](state, action)
);

export default handleActions({
  [LOAD_COURSES_SUCCESS]: (state, action) => ({
    courses: [
      ...state.courses,
      ...action.response,
    ],
  }),
});
