import merge from 'deepmerge';
import { each, isEmpty, keys, map, reduce } from 'lodash';

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const INVALIDATE_FILTERS = 'INVALIDATE_FILTERS';

function requestFilters(aggregation) {
  return {
    type: REQUEST_FILTERS,
    meta: aggregation
  };
}

function receiveFilters(aggregation, filters) {
  return {
    type: RECEIVE_FILTERS,
    meta: aggregation,
    payload: filters
  };
}

function invalidateFilters(aggregation) {
  return {
    type: INVALIDATE_FILTERS,
    meta: aggregation
  };
}

export function invalidateSiblingFilters(root) {
  return (dispatch, getState) => {
    each(getState().filtersByAggregation, (filters, key) => {
      if (key !== root) dispatch(invalidateFilters(key));
    });
  };
}

export function invalidateAllFilters() {
  return (dispatch, getState) => {
    each(getState().filtersByAggregation, (filters, key) => {
      dispatch(invalidateFilters(key));
    });
  };
}

function computeFilters(responses, aggregation) {
  return (dispatch) => {
    dispatch(requestFilters(aggregation));
    const filters = reduce(responses, (output, response) => {
      output = merge(output, response.aggregations[aggregation] || {});
      return output;
    }, {});
    dispatch(receiveFilters(aggregation, filters));
  };
}

function shouldComputeFilters(state, aggregation) {
  const filters = state.filtersByAggregation[aggregation];
  if (!filters || isEmpty(filters)) {
    return true;
  } else if (filters.isFetching) {
    return false;
  }
  return filters.invalidated;
}

function computeFiltersIfNeeded(responses, aggregation) {
  return (dispatch, getState) => {
    if (!shouldComputeFilters(getState(), aggregation)) return Promise.resolve();

    return dispatch(computeFilters(responses, aggregation));
  };
}

export function computeFiltersByAggregation(responses) {
  return (dispatch, getState) => {
    const aggregations = Array.from(reduce(responses, (output, response) => {
      output = new Set([...output, ...keys(response.aggregations)]);
      return output;
    }, new Set()));
    return Promise.all(
      map(aggregations, (aggregation) => {
        return dispatch(computeFiltersIfNeeded(responses, aggregation));
      })
    );
  };
}
