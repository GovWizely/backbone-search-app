import { map } from 'lodash';
import React, { PropTypes } from 'react';

const Notification = ({ notifications, onDismiss }) => {
  if (Object.keys(notifications).length === 0) {
    return null;
  }

  const items = map(notifications, (notification, index) => {
    const css = 'mi-notification__item '.concat(
      notification.type === 'error' ?
        'mi-notification__item--error' :
        'mi-notification__item--info'
    );
    return (
      <li onClick={ onDismiss } className={ css } key={ index } data-index={ index }>
        { notification.text }
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
  notifications: PropTypes.object,
  onDismiss: PropTypes.func
};

export default Notification;
