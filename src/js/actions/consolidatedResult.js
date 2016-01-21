import _ from 'lodash';
import assign from 'object-assign';
import merge from 'deepmerge';
import { fetchArticles } from './article';
import { fetchTradeEvents, fetchTradeLeads } from './trade';
import { requestFilters, receiveFilters } from './filter';

function isFiltering(query) {
  if (!query || !query.filter) return false;

  return true;
}

function consolidateFilters(responses) {
  let filters = {};
  const aggregationKeys = responses.map(response => Object.keys(response.aggregations));
  const commonAggregationKeys = _.intersection(...aggregationKeys);
  commonAggregationKeys.forEach(key => {
    filters[key] = {};
  });
  responses.forEach(response => {
    commonAggregationKeys.forEach(key => {
      filters[key] = merge(filters[key], response.aggregations[key]);
    });
  });
  return filters;
}

function rejectEmptyData(responses) {
  return responses.filter(response => _.get(response, 'metadata.total') > 0);
}

export function fetchConsolidatedResults(query) {
  return (dispatch, getState) => {
    const updateFilter = _.isEmpty(getState().filters.items) || !isFiltering(query);
    if (updateFilter) dispatch(requestFilters());
    const promises = [
      fetchArticles(dispatch, getState, query),
      fetchTradeEvents(dispatch, getState, query),
      fetchTradeLeads(dispatch, getState, query)
    ];
    return Promise
      .all(promises)
      .then(responses => {
        if (!updateFilter) return responses;

        const filters = consolidateFilters(rejectEmptyData(responses));
        dispatch(receiveFilters(filters));

        return responses;
      })
      .catch(e => ({ error: e }));
  };
}
