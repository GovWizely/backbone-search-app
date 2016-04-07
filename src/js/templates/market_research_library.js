import React from 'react';

export const market_research_library = {
  ResultItem: ({ description, title, url }) => (
    <article className="mi-market-research-library mi-result__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p className="url"><a href={ url }>{ url }</a></p>
      <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
    </article>
  ),
  CardItem: ({ description, title, url }) => (
    <article className="mi-market-research-library mi-card__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
    </article>
  )
};
