import React from 'react';

export const ita_taxonomies = {
  ResultItem: ({ name, path }) => (
    <article className="mi-ita-taxonomies mi-result__item">
      <header dangerouslySetInnerHTML={ { __html: name } }></header>
      <p dangerouslySetInnerHTML={ { __html: path } }></p>
    </article>
  ),
  CardItem: ({ name, path }) => (
    <article className="mi-ita-taxonomies mi-card__item">
      <header dangerouslySetInnerHTML={ { __html: name } }></header>
      <p dangerouslySetInnerHTML={ { __html: path } }></p>
    </article>
  )
};
