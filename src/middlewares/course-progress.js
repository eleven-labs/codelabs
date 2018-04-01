import resolve from '../helpers/resolve';
import update from '../helpers/update';

const actions = ['SET_CURRENT_COURSE', 'LOAD_STEP_SUCCESS'];

const LOCAL_STORAGE_OPTIONS = {
  key: 'codelabs',
  paths: [
    'currentStepIndex',
    'currentCourse.date',
    'currentCourse.slug',
  ],
};

const courses = {
  slug: {
    title: '',
    steps: [1, 2, 3],
    // steps: { 1: true, 2: true, 3: false },
  },
};

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

export default (options = LOCAL_STORAGE_OPTIONS) => store => next => action => {
  if (!actions.includes(action.type)) {
    next(action);
    return;
  }

  const { key } = options;

  // 1. get current persisted state
  const persistedProgress = getPersistedProgress(key);

  next(action);

  // 2. get current local state
  const state = store.getState();

  // TODO: 3. select the related state to persist.
  // TODO: 4. compare the persisted state against the local related state.
  // TODO: 5. if different, then update.

  const newCourse = resolve(state, 'currentCourse');
  const newStep = resolve(state, 'currentStepIndex');
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

  persistProgress(key, newState);
};
