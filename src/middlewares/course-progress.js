const actions = ['LOAD_STEP_SUCCESS'];
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
    },
  };

  persistProgress(localStorageKey, newState);
};
