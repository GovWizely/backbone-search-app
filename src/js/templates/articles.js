require('./styles/articles.scss');

import React from 'react';

export const articles = {
  ResultItem: ({ snippet, title, url }) => {
    return (
      <article className="mi-articles mi-result-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="url"><a target="_blank" href={ url }>{ url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: snippet } }></p>
      </article>
    );
  },
  CardItem: ({ snippet, title, url }) => {
    return (
      <article className="mi-articles mi-card-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="mi-text" dangerouslySetInnerHTML={ { __html: snippet } }></p>
      </article>
    );
  }
};
