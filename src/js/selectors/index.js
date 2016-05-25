import { createSelector } from 'reselect';
import { enableAPIs } from '../apis';

const getAPIs = (state) => state.apis;

export const getEnabledAPIs = createSelector([getAPIs], (apis) => enableAPIs(apis));
