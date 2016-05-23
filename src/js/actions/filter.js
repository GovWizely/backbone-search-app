import merge from 'deepmerge';
import { compact, isEmpty, keys, map, pickBy, reduce, uniq } from 'lodash';

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const INVALIDATE_FILTERS = 'INVALIDATE_FILTERS';

export function requestFilters(aggregation) {
  return {
    type: REQUEST_FILTERS,
    meta: aggregation
  };
}

export function receiveFilters(aggregation, filters) {
  return {
    type: RECEIVE_FILTERS,
    meta: aggregation,
    payload: filters
  };
}

export function invalidateFilters(aggregation) {
  return {
    type: INVALIDATE_FILTERS,
    meta: aggregation
  };
}

export function invalidateSiblingFilters(root) {
  return (dispatch, getState) =>
    compact(map(getState().filtersByAggregation, (filters, key) => {
      if (key === root) return null;
      return dispatch(invalidateFilters(key));
    }));
}

export function invalidateAllFilters() {
  return (dispatch, getState) =>
    map(getState().filtersByAggregation, (filters, key) => dispatch(invalidateFilters(key)));
}

function selectedResults(state) {
  const { resultsByAPI: results, selectedAPIs } = state;
  const uniqueIds = map(selectedAPIs, 'uniqueId');
  return pickBy(
    results, (result, uniqueId) => !result.invalidated && uniqueIds.includes(uniqueId)
  );
}

function computeFilters(aggregation) {
  return (dispatch, getState) => {
    const results = selectedResults(getState());
    dispatch(requestFilters(aggregation));
    const filters = reduce(
      results,
      (output, result) => merge(output, result.aggregations[aggregation] || {}),
      {});
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

function computeFiltersIfNeeded(aggregation) {
  return (dispatch, getState) => {
    if (!shouldComputeFilters(getState(), aggregation)) return Promise.resolve();

    return dispatch(computeFilters(aggregation));
  };
}

export function computeFiltersByAggregation() {
  return (dispatch, getState) => {
    const results = selectedResults(getState());

    const aggregations = uniq(
      reduce(
        results,
        (output, result) => output.concat(keys(result.aggregations)),
        []
      ));

    return Promise.all(
      map(
        aggregations,
        (aggregation) => dispatch(computeFiltersIfNeeded(aggregation))
      )
    );
  };
}
