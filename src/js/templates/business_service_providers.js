require('./styles/business_service_providers.scss');

import React from 'react';

export const business_service_providers = {
  ResultItem: ({ company_name, company_website, company_description }) => {
    return (
      <article className="mi-business-service-providers mi-result-item">
        <header>
          <a href={ company_website } dangerouslySetInnerHTML={ { __html: company_name } }></a>
        </header>
        <p><a href={ company_website }>{ company_website }</a></p>
        <p dangerouslySetInnerHTML={ { __html: company_description } }></p>
      </article>
    );
  },
  CardItem: ({ company_name, company_website, company_description }) => {
    return (
      <article className="mi-business-service-providers mi-card-item">
        <header>
          <a href={ company_website } dangerouslySetInnerHTML={ { __html: company_name } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: company_description } }></p>
      </article>
    );
  }
};
