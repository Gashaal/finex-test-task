import initialState from './initial-state';
import {
  SORT,
} from '../actions';

function sort(state, action) {
  const {orderField, orderBy} = action;
  return Object.assign({}, state, {orderField, orderBy});
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SORT:
      return sort(state, action);
    default:
      return state;
  }
}
