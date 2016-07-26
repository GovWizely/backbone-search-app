import React from 'react';

export const starting_points = {
  ResultItem: ({ snippet, title, url }) => (
    <article className="mi-web-documents mi-result__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p><a href={ url }>{ url }</a></p>
      <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  ),
  CardItem: ({ snippet, title, url }) =>(
    <article className="mi-web-documents mi-card__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  )
};
