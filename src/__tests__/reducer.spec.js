import reducer from '../reducers';

test('sort', () => {
  // sort asc by default
  let state = {orderField: 'name', orderBy: 'desc'};
  state = reducer({}, {type: 'SORT', orderField: 'name'});
  expect(state.orderField).toBe('name');
  expect(state.orderBy).toBe('asc');

  // toggle orderBy
  state = {orderField: 'name', orderBy: 'asc'};
  state = reducer(state, {type: 'SORT', orderField: 'name'});
  expect(state.orderField).toBe('name');
  expect(state.orderBy).toBe('desc');
});

test('edit', () => {
  let state = {
    data: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
    editingData: {},
  };
  // create copy in editingData object
  state = reducer(state, {type: 'EDIT', id: 0});
  expect(state.editingData[0]).toEqual({
    id: 0,
    name: 'Продукция 1',
    quantity: 5,
    price: 100,
  });
});

test('cancel', () => {
  let state = {
    editingData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
  };

  // remove from editingData object
  state = reducer(state, {type: 'CANCEL', id: 0});
  expect(state.editingData[0]).toBeUndefined();
});

test('change', () => {
  let state = {
    editingData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
  };
  state = reducer(state, {type: 'CHANGE', id: 0, field: 'quantity', value: 10});
  expect(state.editingData[0].quantity).toBe(10);
});

test('save', () => {
  let state = {
    data: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
    editingData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 15,
        price: 1000,
      },
    },
    filteredData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    }
  };

  // copy data from editingData
  state = reducer(state, {type: 'SAVE', id: 0});
  expect(state.data[0]).toEqual({
    id: 0,
    name: 'Продукция 1',
    quantity: 15,
    price: 1000,
  });
  // copy to filteredData
  expect(state.filteredData[0]).toEqual({
    id: 0,
    name: 'Продукция 1',
    quantity: 15,
    price: 1000,
  });
  // remove from editingData
  expect(state.editingData[0]).toBeUndefined();
});

test('validate', () => {
  let state = {
    errors: {},
  };

  state = reducer(state, {type: 'VALIDATE', id: 0, field: 'quantity', value: -1});
  expect(state.errors[0]).toEqual(['quantity']);

  state = {
    errors: {
      0: ['quantity'],
    },
  };
  state = reducer(state, {type: 'VALIDATE', id: 0, field: 'price', value: -1});
  expect(state.errors[0]).toEqual(['quantity', 'price']);

  state = {
    errors: {
      0: ['quantity', 'price'],
    },
  };
  state = reducer(state, {type: 'VALIDATE', id: 0, field: 'quantity', value: 5});
  expect(state.errors[0]).toEqual(['price']);

  state = {
    errors: {
      0: ['price'],
    },
  };
  state = reducer(state, {type: 'VALIDATE', id: 0, field: 'price', value: 5});
  expect(state.errors[0]).toBeUndefined();
});

test('filter', () => {
  let state = {
    data: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
      1: {
        id: 1,
        name: 'Продукция 2',
        quantity: 10,
        price: 120,
      },
    },
  };

  state = reducer(state, {type: 'FILTER', value: 'Продукция 1'});
  expect(state.filteredData).toEqual({
    0: {
      id: 0,
      name: 'Продукция 1',
      quantity: 5,
      price: 100,
    },
  });

  state = {
    data: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
      1: {
        id: 1,
        name: 'Продукция 2',
        quantity: 10,
        price: 120,
      },
    },
  };
  state = reducer(state, {type: 'FILTER', value: 120});
  expect(state.filteredData).toEqual({
    1: {
      id: 1,
      name: 'Продукция 2',
      quantity: 10,
      price: 120,
    },
  });
});

test('toggle currency', () => {
  let state = {
    currency: 'ruble',
    data: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
    filteredData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
    editingData: {
      0: {
        id: 0,
        name: 'Продукция 1',
        quantity: 5,
        price: 100,
      },
    },
  };
  state = reducer(state, {type: 'TOGGLE_CURRENCY'});
  expect(state.currency).toBe('dollar');
  expect(state.data[0].price).toBe(6000);
  expect(state.filteredData[0].price).toBe(6000);
  expect(state.editingData[0].price).toBe(6000);
  expect(state.amount).toBe(6000);
});
