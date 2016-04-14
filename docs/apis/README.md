# APIs

To add new API to the app, follow the steps below:

## [API Definitions](/src/js/apis)

APIs are grouped by host. Current there are two group of APIs

- [articles](/src/js/apis/articles.js)
- [trades](/src/js/apis/trades.js)

### Defining a new API

Given an API endpoint `http://www.example.com/v1/search` that accept params `q`, `countries`, `industries`, `offset`. The definition will be as below:

```js
// /src/js/apis/examples.js

import { defineAPI } from './utils';

module.exports = defineAPI(examples, {
  aggregations: {
    countries: { type: 'array' },
    industries: { type: 'tree }
  },
  displayName: 'Example',
  endpoint: 'http://www.example.com/v1/search'
  permittedParams: ['q', 'countries', 'industries', 'offset']
})
```

Now include the new API definition into the app:

```js
// /src/js/apis/index.js

import assign from 'object-assign';

export default assign(
  {},
  require('./articles'),
  require('./trades'),
  require('./example') << The new API definition!
);
```

### Defining a new API template

With the new API definition, a new API template is required to display the API response correctly:
```
// /src/js/templates/examples.js

import React from 'react';

export const example = {
  // Used in single API results page.
  ResultItem: ({ id, title, description, url }) => (
    // mi-result__item will provide default styling for each result.
    // To further customize the result style, create /styles/templates/mi-examples.scss
    <article className="mi-examples mi-result__item">
      <header>
        <a href={ url }>{ title }</a>
      </header>
      <p>{ description }</p>
    </article>
  ),
  // Used in multi APIs results page.
  CardItem: ({ id, title, url }) => (
    <article className="mi-examples mi-card__item">
      <header>
        <a href={ url }>{ title }</a>
      </header>
    </article>
  )
};
```

To include the new API template into the app:

```js
import assign from 'object-assign';

export const TEMPLATES = assign(
  {},
  require('./defaults'),
  require('./articles'),
  require('./business_service_providers'),
  require('./consolidated_screening_list'),
  require('./de_minimis'),
  require('./ita_faqs'),
  require('./ita_office_locations'),
  require('./ita_taxonomies'),
  require('./ita_zipcode_to_post'),
  require('./market_research_library'),
  require('./tariff_rates'),
  require('./tpp_rates'),
  require('./trade_articles'),
  require('./trade_events'),
  require('./trade_leads')
);

export function findTemplate(templateName) {
  if (!TEMPLATES[templateName]) return TEMPLATES.defaults;
  return TEMPLATES[templateName];
}
```
