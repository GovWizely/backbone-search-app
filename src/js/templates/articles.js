require('./styles/articles.scss');

import React from 'react';

export const articles = {
  ResultItem: ({ snippet, title, url }) => {
    return (
      <article className="mi-articles mi-result-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p><a href={ url }>{ url }</a></p>
        <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
      </article>
    );
  },
  CardItem: ({ snippet, title, url }) => {
    return (
      <article className="mi-articles mi-card-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
      </article>
    );
  }
};
