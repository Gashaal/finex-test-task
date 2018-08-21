import initialState from './initial-state';
import {
  SORT,
  EDIT,
  CANCEL,
  CHANGE,
  SAVE,
  FILTER,
  VALIDATE,
  TOGGLE_CURRENCY,
} from '../actions';

function getAmount(filteredData) {
  return Object.keys(filteredData).reduce((accumulator, id) => {
    const price = filteredData[id].price;
    const quantity = filteredData[id].quantity;
    return accumulator + price * quantity;
  }, 0);
}

function sort(state, action) {
  const {orderField} = action;
  let orderBy = 'asc';

  if (orderField === state.orderField) {
    orderBy = state.orderBy === 'desc' ? 'asc' : 'desc';
  }

  return {...state, orderField, orderBy};
}

function edit(state, action) {
  const {id} = action;
  const {data, editingData} = state;

  const newEditingData = {...editingData, [id]: data[id]};
  return {...state, editingData: newEditingData};
}

function cancel(state, action) {
  const {id} = action;
  const {editingData} = state;
  const newEditingData = {};

  Object.keys(editingData).forEach((_id) => {
    if (!(_id == id)) {
      newEditingData[id] = {...editingData[id]};
    }
  });

  return {...state, editingData: newEditingData};
}

function change(state, action) {
  const {id, field, value} = action;
  const {editingData} = state;

  const newItem = {...editingData[id]};
  newItem[field] = +value;
  const newEditingData = {...editingData, [id]: newItem};

  return {...state, editingData: newEditingData};
}

function filter(state, action) {
  const {value} = action;
  const {data} = state;
  let filteredData = {};

  if (value) {
    Object.keys(data).forEach((id) => {
      const name = data[id].name;
      const quantity = data[id].quantity;
      const price = data[id].price;

      if (name.includes(value) || quantity == value || price == value) {
        filteredData[id] = {...data[id]};
      }
    });
  } else {
    filteredData = {...data}
  }

  const amount = getAmount(filteredData);
  return {...state, filteredData, amount};
}

function save(state, action) {
  const {id} = action;
  const {data, filteredData, editingData} = state;

  const newData = {...data, [id]: editingData[id]};
  const newFilteredData = {...filteredData, [id]: editingData[id]};
  const newEditingData = {};
  Object.keys(editingData).forEach((_id) => {
    if (!(_id == id)) {
      newEditingData[id] = {...editingData[id]};
    }
  });

  const amount = getAmount(newFilteredData);
  return {...state, data: newData, filteredData: newFilteredData, editingData: newEditingData, amount};
}

function validate(state, action) {
  const {id, field, value} = action;
  const {errors} = state;

  if (typeof value === 'number' && value <= 0) {
    if (Array.isArray(errors[id])) {
      errors[id].push(field);
    } else {
      errors[id] = [];
      errors[id].push(field);
    }
  } else {
    if (Array.isArray(errors[id]) && errors[id].indexOf(field) !== -1) {
      errors[id].splice(errors[id].indexOf(field), 1);
      if (!errors[id].length) {
        delete errors[id];
      }
    }
  }

  return {...state, errors};
}

function toggleCurrency(state, action) {
  const {currency, data, filteredData, editingData} = state;
  const newCurrency = currency === 'ruble' ? 'dollar' : 'ruble';
  const newData = {};
  const newFilteredData = {};
  const newEditingData = {}

  Object.keys(data).map((id) => {
    const price = data[id].price;
    const newPrice = newCurrency === 'ruble' ? Math.round(price * 60 * 10) / 10 : Math.round(price / 60 * 10) / 10;

    newData[id] = {...data[id], price: newPrice};
  });

  Object.keys(filteredData).map((id) => {
    const price = filteredData[id].price;
    const newPrice = newCurrency === 'ruble' ? Math.round(price * 60 * 10) / 10 : Math.round(price / 60 * 10) / 10;

    newFilteredData[id] = {...filteredData[id], price: newPrice};
  });

  Object.keys(editingData).map((id) => {
    const price = editingData[id].price;
    const newPrice = newCurrency === 'ruble' ? Math.round(price * 60 * 10) / 10 : Math.round(price / 60 * 10) / 10;

    newEditingData[id] = {...editingData[id], price: newPrice};
  });

  const newAmount = getAmount(newFilteredData);

  return {
    ...state,
    currency: newCurrency,
    data: newData,
    filteredData: newFilteredData,
    editingData: newEditingData,
    amount: newAmount,
  };
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SORT:
      return sort(state, action);
    case EDIT:
      return edit(state, action);
    case CANCEL:
      return cancel(state, action);
    case CHANGE:
      return change(state, action);
    case SAVE:
      return save(state, action);
    case FILTER:
      return filter(state, action);
    case VALIDATE:
      return validate(state, action);
    case TOGGLE_CURRENCY:
      return toggleCurrency(state, action);
    default:
      return state;
  }
}
