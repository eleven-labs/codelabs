const actions = ['SET_CURRENT_COURSE', 'LOAD_STEP_SUCCESS'];
const localStorageKey = 'codelabs';

const getPersistedProgress = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    return json || {};
  } catch (ex) {
    console.log(ex);
    return {};
  }
};

const persistProgress = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (ex) {
    console.log(ex);
  }
};

export default store => next => action => {
  if (!actions.includes(action.type)) {
    next(action);
    return;
  }

  // 1. get current persisted state
  const persistedProgress = getPersistedProgress(localStorageKey);

  next(action);

  // 2. get current local state
  const state = store.getState();

  const newCourse = state.currentCourse;
  const newStep = state.currentStepIndex;
  const oldCourse = persistedProgress[newCourse.slug] || {};
  const oldSteps = oldCourse.steps || [];

  const newState = {
    ...persistedProgress,
    [newCourse.slug]: {
      title: newCourse.title,
      steps: [
        ...oldSteps,
        !oldSteps.includes(newStep) ? newStep : undefined,
      ].filter(v => typeof v !== 'undefined').sort(),
    },
  };

  persistProgress(localStorageKey, newState);
};
