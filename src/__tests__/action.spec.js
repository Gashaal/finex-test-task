import {
  sort,
  edit,
  cancel,
  change,
  save,
  filter,
  validate,
  toggleCurrency,
} from '../actions';

test('sort', () => {
  const sortAction = sort('name');
  expect(sortAction).toEqual({type: 'SORT', orderField: 'name'});
});

test('edit', () => {
  const editAction = edit(0);
  expect(editAction).toEqual({type: 'EDIT', id: 0});
});

test('cancel', () => {
  const cancelAction = cancel(0);
  expect(cancelAction).toEqual({type: 'CANCEL', id: 0});
});

test('change', () => {
  const changeAction = change(0, 'quantity', 30);
  expect(changeAction).toEqual({type: 'CHANGE', id: 0, field: 'quantity', value: 30});
});

test('save', () => {
  const saveAction = save(0);
  expect(saveAction).toEqual({type: 'SAVE', id: 0});
});

test('filter', () => {
  const filterAction = filter('продукция');
  expect(filterAction).toEqual({type: 'FILTER', value: 'продукция'});
});

test('validate', () => {
  const validateAction = validate(0, 'quantity', 50);
  expect(validateAction).toEqual({type: 'VALIDATE', id: 0, field: 'quantity', value: 50});
});

test('toggle currency', () => {
  const toggleAction = toggleCurrency();
  expect(toggleAction).toEqual({type: 'TOGGLE_CURRENCY'});
});
