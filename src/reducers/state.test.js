import state from './state';

test('State of reducers is empty', () => {
   expect(state({})).toEqual({});
});
