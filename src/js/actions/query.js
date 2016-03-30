import assign from 'object-assign';
import { concat, keys, omit, reduce, isEmpty } from 'lodash';

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

export function clearFiltering(filters = []) {
  return (dispatch, getState) => {
    const { filtersByAggregation, query } = getState();
    if (isEmpty(filters)) filters = keys(filtersByAggregation);

    dispatch(replaceQuery(assign({}, omit(query, filters))));
  };
}
