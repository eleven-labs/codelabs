import { combineReducers } from 'redux';

import courses from './courses';
import topics from './topics';

const rootReducer = combineReducers({
  courses,
  topics,
});

export default rootReducer;
