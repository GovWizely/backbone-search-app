import _ from 'lodash';
import React from 'react';

const href = (id) => `https://success.export.gov/tpp_rates?id=${id}`;

export const tpp_rates = {
  ResultItem: ({ id, subheading_description, annual_rates }) => (
      <article className="mi-tpp-rates mi-result__item">
        <header>
          <a href={ href(id) }>{ subheading_description }</a>
        </header>
        <ul>
          { _.map(annual_rates, (rate, year) => (
            <li key={ year }>{ rate }</li>
          )) }
        </ul>
      </article>
  ),
  CardItem: ({ id, subheading_description, url }) => (
    <article className="mi-tpp-rates mi-card__item">
      <header>
        <a href={ href(id) }>{ subheading_description }</a>
      </header>
    </article>
  )
};
