export const UPDATE_WINDOW = 'UPDATE_WINDOW';

export function updateWindow(options) {
  return {
    type: UPDATE_WINDOW,
    payload: options
  };
}
