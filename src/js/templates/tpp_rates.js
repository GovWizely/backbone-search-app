import { keys, map, pick, startCase, toNumber } from 'lodash';
import React from 'react';

const href = (id) => `https://success.export.gov/tpp_rates?id=${id}`;
const AnnualRates = ({ annualRates, baseRate }) => {
  const rates = map(annualRates, (rate, year) => (
    <tr key={ year }>
      <td className="mi-tpp-rates__annual-rates__label">{ startCase(year) }</td>
      <td className="mi-tpp-rates__annual-rates__value">
        { toNumber(rate) === 0 ? 'Free' : rate }
      </td>
    </tr>
  ));

  return (
    <table className="mi-tpp-rates__annual-rates">
      <tbody>
        <tr>
          <td className="mi-tpp-rates__annual-rates__label">Base Rate</td>
          <td className="mi-tpp-rates__annual-rates__value">{ baseRate.toFixed(1) }</td>
        </tr>
        { rates }
      </tbody>
    </table>
  );
};

export const tpp_rates = {
  ResultItem: ({
    id, annual_rates, base_rate, rule_text, subheading_description,
    staging_basket, tariff_line
  }) => {
    const annualRates = pick(annual_rates, keys(annual_rates).slice(0, 12));
    return (
      <article className="mi-tpp-rates mi-result__item">
        <header>
          <a href={ href(id) }>
            { tariff_line } { subheading_description }
          </a>
        </header>
        <p>Staging Basket: { staging_basket }</p>
        <p>Rule of Origin: { rule_text }</p>
        <AnnualRates annualRates={ annualRates } baseRate={ base_rate } />
      </article>
    );
  },
  CardItem: ({ id, subheading_description, tariff_line }) => (
    <article className="mi-tpp-rates mi-card__item">
      <header>
        <a href={ href(id) }>{ tariff_line } { subheading_description }</a>
      </header>
    </article>
  )
};
