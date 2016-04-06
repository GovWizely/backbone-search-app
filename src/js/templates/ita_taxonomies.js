//require('./styles/ita_taxonomies.scss');

import React from 'react';

export const ita_taxonomies = {
  ResultItem: ({ name, path }) => {
    return (
      <article className="mi-ita-taxonomies mi-result-item">
        <header dangerouslySetInnerHTML={ { __html: name } }></header>
        <p dangerouslySetInnerHTML={ { __html: path } }></p>
      </article>
    );
  },
  CardItem: ({ name, path }) => {
    return (
      <article className="mi-ita-taxonomies mi-card-item">
        <header dangerouslySetInnerHTML={ { __html: name } }></header>
        <p dangerouslySetInnerHTML={ { __html: path } }></p>
      </article>
    );
  }
};
