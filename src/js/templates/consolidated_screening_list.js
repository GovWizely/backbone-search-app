import React from 'react';

export const consolidated_screening_list = {
  ResultItem: ({ name, source_list_url, remarks }) => (
    <article className="mi-consolidated-screening-list mi-result__item">
      <header>
        <a href={ source_list_url } dangerouslySetInnerHTML={ { __html: name } }></a>
      </header>
      <p className="url"><a href={ source_list_url }>{ source_list_url }</a></p>
      <p className="remarks" dangerouslySetInnerHTML={ { __html: remarks } }></p>
    </article>
  ),
  CardItem: ({ name, source_list_url, remarks }) => (
    <article className="mi-consolidated-screening-list mi-card__item">
      <header>
        <a href={ source_list_url } dangerouslySetInnerHTML={ { __html: name } }></a>
      </header>
      <p className="remarks" dangerouslySetInnerHTML={ { __html: remarks } }></p>
    </article>
  )
};
