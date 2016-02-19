export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DEL_NOTIFICATION = 'DEL_NOTIFICATION';

function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
}

function delNotification(notification) {
  return {
    type: DEL_NOTIFICATION,
    payload: notification
  };
}
