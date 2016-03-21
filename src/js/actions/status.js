export const UPDATE_STATUS = 'UPDATE_STATUS';

export function updateStatus(status) {
  return {
    type: UPDATE_STATUS,
    payload: status
  };
}
