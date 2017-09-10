import reducer from '../../src/reducers';
import { INITIAL_STATE } from '../../src/constants';
import {
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
} from '../../src/actions';
import coursesMock from '../mocks/courses.json';

describe('Reducers', () => {
  it('should return the default state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
    expect(reducer({}, {})).toEqual(INITIAL_STATE);
    expect(reducer({}, { type: LOAD_COURSES_REQUEST })).toEqual(INITIAL_STATE);
  });

  it('should return a state with the LOAD_COURSES_SUCCES action and some data in it', () => {
    const action = {
      type: LOAD_COURSES_SUCCESS,
      response: coursesMock,
    };

    const newState = reducer({}, action);
    expect(newState.courses).toHaveLength(3);
  });
});
