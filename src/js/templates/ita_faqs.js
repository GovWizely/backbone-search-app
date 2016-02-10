require('./styles/ita_faqs.scss');

import React from 'react';

export const ita_faqs = {
  ResultItem: ({ answer, question }) => {
    return (
      <article className="mi-ita-faqs mi-result-item">
        <header dangerouslySetInnerHTML={ { __html: question } }></header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  },
  CardItem: ({ answer, question }) => {
    return (
      <article className="mi-ita-faqs mi-card-item">
        <header dangerouslySetInnerHTML={ { __html: question } }></header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  }
};
