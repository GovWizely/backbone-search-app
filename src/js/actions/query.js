import assign from 'object-assign';
import { concat, intersection, keys, omit, reduce, isEmpty } from 'lodash';

import { invalidateAllFilters, invalidateSiblingFilters } from './filter';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const REPLACE_QUERY = 'REPLACE_QUERY';

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

export function updateFiltering(name, values) {
  return (dispatch, getState) => {
    if (isEmpty(values)) {
      dispatch(replaceQuery(
        assign({}, omit(getState().query, [name]), { offset: 0 })
      ));
    } else {
      dispatch(updateQuery({ [name]: values, offset: 0 }));
    }

    const { filtersByAggregation, query } = getState();
    if (intersection(keys(filtersByAggregation), keys(query)).length === 0) {
      dispatch(invalidateAllFilters());
    } else {
      dispatch(invalidateSiblingFilters(name));
    }
  };
}
