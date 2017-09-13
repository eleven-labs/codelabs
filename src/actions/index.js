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
    endpoint: 'courses',
  },
});
