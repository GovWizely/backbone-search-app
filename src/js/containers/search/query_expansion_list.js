require('./styles/query_expansion_list.scss');

import { isEmpty, keys, map } from 'lodash';
import React from 'react';

var QueryExpansion = ({ onClick, queryExpansions }) => {
  const { invalidated, isFetching, items } = queryExpansions;
  if (isFetching || !items) return <noscript />;

  let terms = map(items.world_regions, (region) => {
    const key = keys(region)[0],
          value = region[key];
    return (
      <li key={ key }>
        <a onClick={ onClick.bind(undefined, value) }>{ key }</a>
      </li>
    );
  });

  if (isEmpty(terms)) return <noscript />;
  return (
    <div className="animated fadeIn">Expand Search To:
      <ul className="mi-query-expansion-list">
        { terms }
      </ul>
    </div>
  );
};

export default QueryExpansion;
