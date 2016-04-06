//require('./styles/ita_faqs.scss');

import React from 'react';

const href = (id => `https://success.export.gov/faq?id=${id}`);

export const ita_faqs = {
  ResultItem: ({ id, answer, question }) => {
    return (
      <article className="mi-ita-faqs mi-result-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: question } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  },
  CardItem: ({ id, answer, question }, options) => {
    return (
      <article className="mi-ita-faqs mi-card-item">
        <header>
          <a href={ href(id) } dangerouslySetInnerHTML={ { __html: question } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: answer } }></p>
      </article>
    );
  }
};
