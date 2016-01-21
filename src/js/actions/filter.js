export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';

export function requestFilters() {
  return {
    type: REQUEST_FILTERS
  };
}

export function receiveFilters(filters) {
  return {
    type: RECEIVE_FILTERS,
    filters
  };
}
