import {
  sort,
} from '../actions';

test('sort', () => {
  const sortAction = sort('name', 'desc');
  expect(sortAction).toEqual({type: 'SORT', orderField: 'name', orderBy: 'desc'});
});