import { isEmpty, keys, omitBy, values } from 'lodash';
import { stringify } from 'querystring';
import { push } from 'react-router-redux';

export function updatePath() {
  return (dispatch, getState) => {
    const { query, selectedAPIs } = getState();

    let apiName = '';
    if (keys(selectedAPIs).length === 1) apiName = values(selectedAPIs)[0].uniqueId;
    window.scrollTo(0, 0);
    return dispatch(push(`/search/${apiName}?${stringify(omitBy(query, isEmpty))}`));
  };
}
