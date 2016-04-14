import React from 'react';

export const ita_office_locations = {
  ResultItem: ({ address, email, office_name }) => (
    <article className="mi-ita-office-locations mi-result__item">
      <header>
        <a href={ email } dangerouslySetInnerHTML={ { __html: office_name } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: address } }></p>
    </article>
  ),
  CardItem: ({ address, email, office_name }) => (
    <article className="mi-ita-office-locations mi-card__item">
      <header>
        <a href={ `mailto:${email}` } dangerouslySetInnerHTML={ { __html: office_name } }></a>
      </header>
      <p dangerouslySetInnerHTML={ { __html: address } }></p>
    </article>
  )
};
