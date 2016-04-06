import _ from 'lodash';
import React, { PropTypes } from 'react';

const Notification = ({ notifications }) => {
  if (Object.keys(notifications).length === 0) {
    return <span style={ { display: 'none' } }></span>;
  }

  const items = _.map(notifications, (notification, api) => {
    const css = notification.type === 'error' ? 'mi-error' : 'mi-info';
    return <li className={ css } key={ api }>{ api } { notification.payload.message }</li>;
  });
  return (
    <div className="mi-notification mi-notification-top-center">
      <div className="mi-notification-message">
        <ul>
          { items }
        </ul>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.object,
  onClick: PropTypes.func
};

export default Notification;
