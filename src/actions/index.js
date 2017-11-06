import { CALL_API } from '../services';

export const LOAD_COURSES_REQUEST = 'LOAD_COURSES_REQUEST';
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_COURSES_FAILURE = 'LOAD_COURSES_FAILURE';

export const loadCourses = () => ({
  [CALL_API]: {
    types: [
      LOAD_COURSES_REQUEST,
      LOAD_COURSES_SUCCESS,
      LOAD_COURSES_FAILURE,
    ],
    endpoint: 'index.json',
  },
});


export const LOAD_STEP_REQUEST = 'LOAD_STEP_REQUEST';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';
export const LOAD_STEP_FAILURE = 'LOAD_STEP_FAILURE';

export const loadStep = (path) => ({
  [CALL_API]: {
    types: [
      LOAD_STEP_REQUEST,
      LOAD_STEP_SUCCESS,
      LOAD_STEP_FAILURE,
    ],
    endpoint: path,
  },
});
