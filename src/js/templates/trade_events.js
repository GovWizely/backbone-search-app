import React from 'react';

export const trade_events = {
  ResultItem: ({ title, url, snippet }) => (
    <article className="mi-trade-events mi-result__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p><a href={ url }>{ url }</a></p>
      <p dangerouslySetInnerHTML={ { __html: snippet} }></p>
    </article>
  ),
  CardItem: ({ title, url, snippet }) => (
    <article className="mi-trade-events mi-card__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  )
};
