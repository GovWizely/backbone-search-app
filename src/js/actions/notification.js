import { delay, find, now } from 'lodash';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

function addNotification(id, status, text) {
  return {
    type: ADD_NOTIFICATION,
    payload: { id, status, text }
  };
}

export function dismissNotification(id) {
  return {
    type: DISMISS_NOTIFICATION,
    payload: id
  };
}

export function notify({ id = now().toString(), status, text }) {
  return (dispatch, getState) => {
    const { notifications } = getState();
    if (notifications.length >= 7) {
      dispatch(dismissNotification(notifications[0].id));
    }
    if (!find(notifications, { id })) {
      dispatch(addNotification(id, status, text));
      delay(() => {
        dispatch(dismissNotification(id));
      }, 2000);
    }
  };
}
