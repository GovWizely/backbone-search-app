export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export function addNotification(text, type) {
  return {
    type: ADD_NOTIFICATION,
    payload: { text, type }
  };
}

export function dismissNotification(id) {
  return {
    type: DISMISS_NOTIFICATION,
    payload: id
  };
}
