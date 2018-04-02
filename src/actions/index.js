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

export const setCourses = courses => ({
  type: LOAD_COURSES_SUCCESS,
  response: courses,
});


export const SET_CURRENT_COURSE = 'SET_CURRENT_COURSE';

export const setCurrentCourse = permalink => ({
  type: SET_CURRENT_COURSE,
  permalink,
});

export const LOAD_STEP_REQUEST = 'LOAD_STEP_REQUEST';
export const LOAD_STEP_SUCCESS = 'LOAD_STEP_SUCCESS';
export const LOAD_STEP_FAILURE = 'LOAD_STEP_FAILURE';

export const loadStep = (course, stepIndex) => {
  const permalink = `${course.date}-${course.slug}`;
  const step = stepIndex <= 0 ? 'index' : `step${stepIndex}`;

  return {
    [CALL_API]: {
      types: [
        LOAD_STEP_REQUEST,
        LOAD_STEP_SUCCESS,
        LOAD_STEP_FAILURE,
      ],
      endpoint: `${permalink}/${step}.md`,
    },
    stepIndex,
  };
};
