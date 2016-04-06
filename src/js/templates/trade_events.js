//require('./styles/trade_events.scss');

import React from 'react';

const href = (id => `https://success.export.gov/tradeevent?id=${id}`);

export const trade_events = {
  ResultItem: ({ id, event_name, event_type, start_date, end_date, start_time, end_time, registration_link, description }) => {
    return (
      <article className="mi-trade-events mi-result-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: event_name } }></a>
        </header>
        <p className="url"><a href={ registration_link }>{ registration_link }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  },
  CardItem: ({ id, event_name, event_type, start_date, end_date, start_time, end_time, registration_link, description }) => {
    return (
      <article className="mi-trade-events mi-card-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: event_name } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  }
};
