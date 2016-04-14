import React from 'react';

export const tariff_rates = {
  ResultItem: ({ link_url, rule_text, subheading_description }) => (
    <article className="mi-tariff-rates mi-result__item">
      <header>
        <a href={ link_url } dangerouslySetInnerHTML={ { __html: subheading_description } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: rule_text } }></p>
    </article>
  ),
  CardItem: ({ link_url, rule_text, subheading_description }) => (
    <article className="mi-tariff_rates mi-card__item">
      <header>
        <a href={ link_url } dangerouslySetInnerHTML={ { __html: subheading_description } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: rule_text } }></p>
    </article>
  )
};
