import { concat, keys, pull, reduce, isEmpty } from 'lodash';

import { invalidateAllFilters, invalidateSiblingFilters } from './filter';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const REPLACE_QUERY = 'REPLACE_QUERY';

function rejectEmptyValue(query) {
  return reduce(query, (output, value, key) => {
    if (!isEmpty(value)) output[key] = value;
    return output;
  }, {});
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  };
}

export function replaceQuery(query) {
  return {
    type: REPLACE_QUERY,
    payload: query
  };
}

function isFiltered(getState) {
  const { filtersByAggregation, query } = getState();
  const filterNames = keys(filtersByAggregation);
  for (let filterName of filterNames) {
    if (!isEmpty(query[filterName])) return true;
  }
  return false;
}

function isOutdated(getState) {
  const { filtersByAggregation, query } = getState();
  return false;
}

export function updateFilterQuery(item) {
  return (dispatch, getState) => {
    const { query } = getState();
    let filterItems = query[item.name] || [];
    filterItems = item.checked ?
      concat(filterItems, item.value) :
      pull(filterItems, item.value);
    dispatch(updateQuery({ [item.name]: filterItems }));

    isFiltered(getState) ?
      dispatch(invalidateSiblingFilters(item.name)) :
      dispatch(invalidateAllFilters());
  };
}
