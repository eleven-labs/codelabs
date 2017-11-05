import { LOAD_COURSES_SUCCESS } from '../actions';

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
    courses: action.response,
  }),
});
