const data = {
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
  2: {
    id: 2,
    name: 'Продукция 3',
    quantity: 23,
    price: 34,
  },
  3: {
    id: 3,
    name: 'Продукция 4',
    quantity: 2,
    price: 150,
  },
  4: {
    id: 4,
    name: 'Продукция 5',
    quantity: 14,
    price: 70,
  },
};

// will show in data
const filteredData = {...data};

const initialState = {
  currency: '$',
  orderField: 'name',
  orderBy: 'desc',
  amount: 500,
  editingData: {}, //stored data in editing process
  errors: {}, // stored validation errors
  filteredData,
  data,
};

export default initialState;