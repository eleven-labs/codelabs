import { INITIAL_STATE } from '../constants';

export default cases => (state = INITIAL_STATE, action) => (
  !cases[action.type] ? state : cases[action.type](state, action)
);
