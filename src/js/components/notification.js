import { map } from 'lodash';
import React, { PropTypes } from 'react';

const Notification = ({ notifications, onDismiss }) => {
  if (Object.keys(notifications).length === 0) return null;

  const items = map(notifications, (notification) => {
    const { id, status, text } = notification;
    const css = 'mi-notification__item '.concat(
      status === 'error' ?
        'mi-notification__item--error' :
        'mi-notification__item--info'
    );
    return (
      <li onClick={ onDismiss } className={ css } key={ id } data-id={ id }>
        { text }
      </li>
    );
  });
  return (
    <ul className="mi-notification mi-notification--top-right mi-notification--error">
      { items }
    </ul>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array,
  onDismiss: PropTypes.func
};

export default Notification;
