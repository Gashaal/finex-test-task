export const SORT = 'SORT';
export function sort(orderField, orderBy) {
  return {
    type: 'SORT',
    orderField,
    orderBy,
  };
}
