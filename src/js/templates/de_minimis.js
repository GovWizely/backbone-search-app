import React from 'react';

export const de_minimis = {
  ResultItem: ({ country_name, country, de_minimis_value, de_minimis_currency, vat_amount, vat_currency, notes }) => (
    <article className="mi-de-minimis mi-result__item">
      <header>{ country_name }({country})</header>
      <p>De Minimis: { de_minimis_currency } { de_minimis_value }</p>
      <p>VAT: { vat_currency ? `${vat_currency} ${vat_amount}` : 'null' }</p>
      <p>{ notes }</p>
    </article>
  ),
  CardItem: ({ country_name, country, de_minimis_value, de_minimis_currency, vat_amount, vat_currency, notes }) => (
    <article className="mi-de-minimis mi-card__item">
      <header>{ country_name }({country})</header>
      <p>De Minimis: { de_minimis_currency } { de_minimis_value }</p>
      <p>VAT: { vat_currency ? `${vat_currency} ${vat_amount}` : 'null' }</p>
      <p>{ notes }</p>
    </article>
  )
};
