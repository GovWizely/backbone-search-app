import { reduce, isEmpty } from 'lodash';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const REPLACE_QUERY = 'REPLACE_QUERY';

function rejectEmptyValue(query) {
  return reduce(query, (output, value, key) => {
    if (!isEmpty(value)) output[key] = value;
    return output;
  }, {});
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: rejectEmptyValue(query)
  };
}

export function replaceQuery(query) {
  return {
    type: REPLACE_QUERY,
    payload: rejectEmptyValue(query)
  };
}
