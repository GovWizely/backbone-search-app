import React from 'react';

const style = {};

export const consolidated_screening_list = {
  ResultItem: ({ name, source_list_url, remarks }) => {
    return (
      <article className="mi-consolidated-screening-list mi-result-item">
        <header>
          <a href={ source_list_url } dangerouslySetInnerHTML={ { __html: name } }></a>
        </header>
        <p className="url"><a target="_blank" href={ source_list_url }>{ source_list_url }</a></p>
        <p className="remarks" dangerouslySetInnerHTML={ { __html: remarks } }></p>
      </article>
    );
  },
  CardItem: ({ name, source_list_url, remarks }) => {
    return (
      <article className="mi-consolidated-screening-list mi-card-item">
        <header>
          <a href={ source_list_url } dangerouslySetInnerHTML={ { __html: name } }></a>
        </header>
        <p className="remarks" dangerouslySetInnerHTML={ { __html: remarks } }></p>
      </article>
    );
  }
};
