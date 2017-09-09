import handleAction from './handleActions';
import { LOAD_COURSES_SUCCESS } from '../actions';

export default handleAction({
  [LOAD_COURSES_SUCCESS]: (state, action) => action.response,
});
