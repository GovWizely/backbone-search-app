export const UPDATE_FILTERS = 'UPDATE_FILTERS';

export function updateFilters(filters) {
  return {
    type: UPDATE_FILTERS,
    filters
  };
}
