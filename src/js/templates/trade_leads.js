import React from 'react';
import { truncate } from './utils';

const href = (id) => `https://www.export.gov/tradelead?id=${id}`;

export const trade_leads = {
  ResultItem: ({ id, title, description }) => (
    <article className="mi-trade-leads mi-result__item">
      <header>
        <a href={ href(id) } dangerouslySetInnerHTML={ { __html: title || description } }></a>
      </header>
      <p><a href={ href(id) }>{ href(id) }</a></p>
      <p>{ truncate(description, 60) }</p>
    </article>
  ),
  CardItem: ({ id, title, description }) => (
    <article className="mi-trade-leads mi-card__item">
      <header>
        <a href={ href(id) } dangerouslySetInnerHTML={ { __html: title || description } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: description } }></p>
    </article>
  )
};
