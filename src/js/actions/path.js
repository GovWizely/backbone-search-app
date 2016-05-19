import { isEmpty, keys, omitBy, values } from 'lodash';
import { stringify } from 'querystring';
import { updatePath as _updatePath } from 'redux-simple-router';

export function updatePath() {
  return (dispatch, getState) => {
    const { query, selectedAPIs } = getState();
    let apiName = '';
    if (keys(selectedAPIs).length === 1) apiName = values(selectedAPIs)[0].uniqueId;

    return dispatch(_updatePath(`/search/${apiName}?${stringify(omitBy(query, isEmpty))}`));
  };
}
