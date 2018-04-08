import {
  LOAD_COURSES_SUCCESS,
  LOAD_STEP_SUCCESS,
  SET_CURRENT_COURSE,
  UPDATE_COURSE_PROGRESS,
} from '../actions';

/**
 * Creates the main reducer.
 *
 * @param {Dict} cases This is a mapping that contains a reducer for each action type.
 * this is an alternative to the switch statement.
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
    currentStepIndex: action.stepIndex,
    currentStepMD: action.response,
  }),
  [SET_CURRENT_COURSE]: (state, action) => ({
    ...state,
    currentCourse: state.courses.find(course => (
      course.permalink === action.permalink
    )),
  }),
  [UPDATE_COURSE_PROGRESS]: (state, { type, ...courseProgress }) => ({
    ...state,
    courseProgress,
  }),
});
