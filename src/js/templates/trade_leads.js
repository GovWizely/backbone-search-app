require('./styles/trade_leads.scss');

import React from 'react';

export const trade_leads = {
  ResultItem: ({ title, description, url }) => {
    return (
      <article className="mi-trade-leads mi-result-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="url"><a target="_blank" href={ url }>{ url }</a></p>
        <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  },
  CardItem: ({ title, description, url }) => {
    return (
      <article className="mi-trade-leads mi-card-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  }
};
