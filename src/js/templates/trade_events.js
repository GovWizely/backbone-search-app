require('./styles/trade_events.scss');

import React from 'react';

export const trade_events = {
  ResultItem: ({ event_name, event_type, start_date, end_date, start_time, end_time, registration_link, description }) => {
    return (
      <article className="mi-trade-events mi-result-item">
        <header>
          <a href={ registration_link } dangerouslySetInnerHTML={ { __html: event_name } }></a>
        </header>
        <p className="url"><a target="_blank" href={ registration_link }>{ registration_link }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  },
  CardItem: ({ event_name, event_type, start_date, end_date, start_time, end_time, registration_link, description }) => {
    return (
      <article className="mi-trade-events mi-card-item">
        <header>
          <a href={ registration_link } dangerouslySetInnerHTML={ { __html: event_name } }></a>
        </header>
        <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  }
};
