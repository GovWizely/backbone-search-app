require('./styles/ita_faqs.scss');

import React from 'react';

function uniqueId(id) {
  return `ita_faqs_${id}`;
}

export const ita_faqs = {
  ResultItem: ({ id, answer, question }) => {
    return (
      <article id={ uniqueId(id) } className="mi-ita-faqs mi-result-item">
        <header dangerouslySetInnerHTML={ { __html: question } }></header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  },
  CardItem: ({ id, answer, question }, options) => {
    const url = `${options.url}&highlight=${uniqueId(id)}`;
    return (
      <article className="mi-ita-faqs mi-card-item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: question } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  }
};
