export const SORT = 'SORT';
export function sort(orderField) {
  return {
    type: 'SORT',
    orderField,
  };
}

export const EDIT = 'EDIT';
export function edit(id) {
  return {
    type: EDIT,
    id,
  };
}

export const CANCEL = 'CANCEL';
export function cancel(id) {
  return {
    type: CANCEL,
    id,
  };
}

export const CHANGE = 'CHANGE';
export function change(id, field, value) {
  return {
    type: CHANGE,
    id,
    field,
    value,
  }
}

export const SAVE = 'SAVE';
export function save(id) {
  return {
    type: SAVE,
    id,
  }
}

export const FILTER = 'FILTER';
export function filter(value) {
  return {
    type: FILTER,
    value,
  }
}

export const VALIDATE = 'VALIDATE';
export function validate(id, field, value) {
  return {
    type: VALIDATE,
    id,
    field,
    value,
  }
}

export const TOGGLE_CURRENCY = 'TOGGLE_CURRENCY';
export function toggleCurrency() {
  return {
    type: TOGGLE_CURRENCY,
  }
}