export const UPDATE_QUERY = 'UPDATE_QUERY';
export const REPLACE_QUERY = 'REPLACE_QUERY';

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  };
}

export function replaceQuery(query) {
  return {
    type: REPLACE_QUERY,
    payload: query
  };
}
