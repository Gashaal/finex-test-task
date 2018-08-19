import reducer from '../reducers';

test('sort', () => {
  let state = reducer({}, {type: 'SORT', orderField: 'name', orderBy: 'desc'});
  expect(state.orderField).toBe('name');
  expect(state.orderBy).toBe('desc');
});