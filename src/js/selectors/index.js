import merge from 'deepmerge';
import { forEach, map, pick } from 'lodash';
import { createSelector } from 'reselect';
import { enableAPIs } from '../apis';

const getAPIs = (state) => state.apis;

export const getEnabledAPIs = createSelector([getAPIs], (apis) => enableAPIs(apis));

const getResultsByAPI = (state) => state.resultsByAPI;
const getSelectedApis = (state) => state.selectedAPIs;

export const getFilters = createSelector([getResultsByAPI, getSelectedApis], (results, apis) => {
  const selectedResults = pick(results, map(apis, 'uniqueId'));
  let filters = {};
  forEach(selectedResults, ({ aggregations }) => {
    filters = merge(filters, aggregations);
  });
  return filters;
});
