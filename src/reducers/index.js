import {
  LOAD_COURSES_SUCCESS,
  LOAD_STEP_SUCCESS,
} from '../actions';

/**
 * Creates the main reducer.
 *
 * @param {Dict} cases This is a mapping that contains a reducer for each action type.
 * this is an alternative to the switch statment.
 */
const handleActions = cases => (state = {}, action) => (
  (!action || !cases[action.type]) ? state : cases[action.type](state, action)
);

export default handleActions({
  [LOAD_COURSES_SUCCESS]: (state, action) => ({
    ...state,
    courses: action.response,
  }),
  [LOAD_STEP_SUCCESS]: (state, action) => ({
    ...state,
    currentStepMD: action.response,
  }),
});
