require('./styles/trade_leads.scss');

import React from 'react';

const href = (id) => `https://success.export.gov/tradelead?id=${id}`;

export const trade_leads = {
  ResultItem: ({ id, title, description, url }) => {
    return (
      <article className="mi-trade-leads mi-result-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: title || description } }></a>
        </header>
        <p><a href={ url }>{ url }</a></p>
        <p dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  },
  CardItem: ({ id, title, description, url }) => {
    return (
      <article className="mi-trade-leads mi-card-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: title || description } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  }
};
