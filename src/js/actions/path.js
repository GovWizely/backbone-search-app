import { omitBy, isEmpty } from 'lodash';
import { stringify } from 'querystring';
import { updatePath as _updatePath } from 'redux-simple-router';

export function updatePath() {
  return (dispatch, getState) => {
    const { selectedAPIs, query } = getState();
    let apiName = '';
    if (Object.keys(selectedAPIs).length === 1) apiName = Object.values(selectedAPIs)[0].uniqueId;

    dispatch(_updatePath(`/search/${apiName}?${stringify(omitBy(query, isEmpty))}`));
  };
}
