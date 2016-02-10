require('./styles/tariff_rates.scss');

import React from 'react';

export const tariff_rates = {
  ResultItem: ({ link_url, rule_text, subheading_description }) => {
    return (
      <article className="mi-tariff-rates mi-result-item">
        <header>
          <a href={ link_url } dangerouslySetInnerHTML={ { __html: subheading_description } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: rule_text } }></p>
      </article>
    );
  },
  CardItem: ({ link_url, rule_text, subheading_description }) => {
    return (
      <article className="mi-tariff_rates mi-card-item">
        <header>
          <a href={ link_url } dangerouslySetInnerHTML={ { __html: subheading_description } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: rule_text } }></p>
      </article>
    );
  }
};
