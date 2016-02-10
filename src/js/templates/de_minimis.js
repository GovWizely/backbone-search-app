require('./styles/de_minimis.scss');

import React from 'react';

export const de_minimis = {
  ResultItem: ({ country_name, country, de_minimis_value, de_minimis_currency, vat_amount, vat_currency, notes }) => {
    return (
      <article className="mi-de-minimis mi-result-item">
        <header>{ country_name }({country})</header>
      </article>
    );
  },
  CardItem: ({ country_name, country, de_minimis_value, de_minimis_currency, vat_amount, vat_currency, notes }) => {
    return (
      <article className="mi-de-minimis mi-card-item">
        <header>{ country_name }({country})</header>
        <p>De Minimis: { de_minimis_currency } { de_minimis_value }</p>
        <p>VAT: { vat_currency ? `${vat_currency} ${vat_amount}` : 'null' }</p>
        <p>{ notes }</p>
      </article>
    );
  }
};
