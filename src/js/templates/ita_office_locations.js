//require('./styles/ita_office_locations.scss');

import React from 'react';

export const ita_office_locations = {
  ResultItem: ({ address, email, office_name }) => {
    return (
      <article className="mi-ita-office-locations mi-result-item">
        <header>
          <a href={ email } dangerouslySetInnerHTML={ { __html: office_name } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: address } }></p>
      </article>
    );
  },
  CardItem: ({ address, email, office_name }) => {
    return (
      <article className="mi-ita-office-locations mi-card-item">
        <header>
          <a href={ `mailto:${email}` } dangerouslySetInnerHTML={ { __html: office_name } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: address } }></p>
      </article>
    );
  }
};
