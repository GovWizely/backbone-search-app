require('./styles/trade_articles.scss');

import React from 'react';

export const trade_articles = {
  ResultItem: ({ summary, title, url_html_source }) => {
    return (
      <article className="mi-trade-articles mi-result-item">
        <header>
          <a href={ url_html_source } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="url"><a href={ url_html_source }>{ url_html_source }</a></p>
        <p dangerouslySetInnerHTML={ { __html: summary } }></p>
      </article>
    );
  },
  CardItem: ({ summary, title, url_html_source }) => {
    return (
      <article className="mi-trade-articles mi-card-item">
        <header>
          <a href={ url_html_source } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: summary } }></p>
      </article>
    );
  }
};
