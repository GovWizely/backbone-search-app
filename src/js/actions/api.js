export const ENABLE_APIS = 'ENABLE_APIS';
export const SELECT_APIS = 'SELECT_APIS';

export function selectAPIs(apis) {
  return {
    type: SELECT_APIS,
    payload: Array.isArray(apis) ? apis : [apis]
  };
}

export function enableAPIs(apis) {
  return {
    type: ENABLE_APIS,
    payload: Array.isArray(apis) ? apis : [apis]
  };
}
