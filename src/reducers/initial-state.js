const initialState = {
  catalog: {
    currency: '$',
    current: [
      {
        id: 0,
        name: 'Продукция 1',
        amount: 5,
        price: 100,
      },
      {
        id: 1,
        name: 'Продукция 2',
        amount: 10,
        price: 120,
      },
      {
        id: 2,
        name: 'Продукция 3',
        amount: 23,
        price: 34,
      },
      {
        id: 3,
        name: 'Продукция 4',
        amount: 2,
        price: 150,
      },
      {
        id: 4,
        name: 'Продукция 5',
        amount: 14,
        price: 70,
      },
    ],
    editing: {},
  },
  orderField: 'name',
  orderBy: 'desc',
};

export default initialState;