import React from 'react';

const href = (id) => `https://success.export.gov/tradeevent?id=${id}`;

export const trade_events = {
  ResultItem: ({ id, event_name, event_type, start_date, end_date, start_time, end_time, description }) => (
    <article className="mi-trade-events mi-result__item">
      <header>
        <a href={ href(id) } dangerouslySetInnerHTML={ { __html: event_name } }></a>
      </header>
      <p className="url"><a href={ href(id) }>{ href(id) }</a></p>
      <p className="snippet" dangerouslySetInnerHTML={ { __html: description } }></p>
    </article>
  ),
  CardItem: ({ id, event_name, event_type, start_date, end_date, start_time, end_time, description }) => (
    <article className="mi-trade-events mi-card__item">
      <header>
        <a href={ href(id) } dangerouslySetInnerHTML={ { __html: event_name } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: description } }></p>
    </article>
  )
};
