import React from 'react';

export const trade_leads = {
  ResultItem: ({ url, title, snippet }) => (
    <article className="mi-trade-leads mi-result__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p><a href={ url }>{ url }</a></p>
      <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  ),
  CardItem: ({ url, title, snippet }) => (
    <article className="mi-trade-leads mi-card__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  )
};
