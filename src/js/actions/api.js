export const SELECT_APIS = 'SELECT_APIS';

export function selectAPIs(apis) {
  return {
    type: SELECT_APIS,
    payload: Array.isArray(apis) ? apis : [apis]
  };
}
