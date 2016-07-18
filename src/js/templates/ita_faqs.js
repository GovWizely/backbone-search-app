import React from 'react';

export const ita_faqs = {
  ResultItem: ({ id, answer, question, url }) => (
    <article className="mi-ita-faqs mi-result__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: question } }></a>
      </header>
      <p><a href={ url }>{ url }</a></p>
      <p dangerouslySetInnerHTML={ { __html: answer } }></p>
    </article>
  ),
  CardItem: ({ id, answer, question, url }) => (
    <article className="mi-ita-faqs mi-card__item">
      <header>
        <a href={ url } dangerouslySetInnerHTML={ { __html: question } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: answer } }></p>
    </article>
  )
};
