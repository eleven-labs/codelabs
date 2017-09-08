import reducer from '../../src/reducers';

test('State of reducers is empty', () => {
  expect(reducer({})).toEqual({
    courses: [],
    topics: [],
  });
});
