require('./styles/market_research_library.scss');

import React from 'react';

export const market_research_library = {
  ResultItem: ({ description, title, url }) => {
    return (
      <article className="mi-market-research-library mi-result-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="url"><a href={ url }>{ url }</a></p>
        <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  },
  CardItem: ({ description, title, url }) => {
    return (
      <article className="mi-market-research-library mi-card-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="description" dangerouslySetInnerHTML={ { __html: description } }></p>
      </article>
    );
  }
};
