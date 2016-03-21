export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const INVALIDATE_FILTERS = 'INVALIDATE_FILTERS';

export function requestFilters() {
  return {
    type: REQUEST_FILTERS
  };
}

export function receiveFilters(filters) {
  return {
    type: RECEIVE_FILTERS,
    payload: filters
  };
}

export function invalidateFilters() {
  return {
    type: INVALIDATE_FILTERS
  };
}
