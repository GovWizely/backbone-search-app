import fetch from 'isomorphic-fetch';

import { formatFilterParams, formatParams, noAction } from '../utils/action-helper';

export const REQUEST_RESOURCES = 'REQUEST_RESOURCES';
export const RECEIVE_RESOURCES = 'RECEIVE_RESOURCES';

function requestResources(resource) {
  return {
    type: REQUEST_RESOURCES,
    meta: resource.stateKey
  };
}

function receiveResources(resource, response) {
  return {
    type: RECEIVE_RESOURCES,
    payload: response,
    meta: resource.stateKey
  };
}

export function fetchResources(query) {
  return (dispatch, getState) => {
  };
}
