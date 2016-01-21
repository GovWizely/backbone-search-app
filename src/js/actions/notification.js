export const NOTIFY_ERRORS = 'NOTIFY_ERRORS';

export function notifyErrors(error) {
  return {
    type: NOTIFY_ERRORS,
    message: error,
    status: 'danger'
  };
}
