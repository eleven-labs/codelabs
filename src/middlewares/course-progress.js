import {
  getPersistedProgress,
  persistProgress,
} from '../services/course-progress';
import { LOCAL_STORAGE_KEY } from '../constants';
import {
  LOAD_STEP_SUCCESS,
  updateCourseProgress,
} from '../actions';

const actions = [LOAD_STEP_SUCCESS];

export default store => next => async action => {
  if (!actions.includes(action.type)) {
    next(action);
    return;
  }

  // 1. get current persisted state
  const persistedProgress = await getPersistedProgress(LOCAL_STORAGE_KEY);

  next(action);

  // 2. get current local state
  const {
    currentCourse: newCourse,
    currentStepIndex: newStep,
  } = store.getState();

  const oldCourse = persistedProgress[newCourse.slug] || {};
  const oldSteps = new Set(oldCourse.steps || []).add(newStep);

  const newState = {
    ...persistedProgress,
    [newCourse.slug]: {
      title: newCourse.title,
      steps: Array.from(oldSteps).sort(),
      permalink: newCourse.permalink,
      currentStep: newStep,
    },
  };

  await persistProgress(LOCAL_STORAGE_KEY, newState);
  store.dispatch(updateCourseProgress(newState));
};
