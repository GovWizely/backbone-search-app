import { each, isEmpty, map, reduce, startCase } from 'lodash';
import React from 'react';

import CheckboxTree from '../../components/checkbox-tree';

function noFilter(filters) {
  if (!reduce(filters, (output, filter) => {
    return output || !filter.invalidated;
  }, false)) return true;

  for (let name in filters) {
    if (!isEmpty(filters[name].items)) return false;
  }
  return true;
}

var Filter = ({ filters, onChange, query }) => {
  if (noFilter(filters)) return <noscript />;

  const checkboxTrees = map(filters, (filter, key) => {
    let values = query[key] || [];
    return (
      <CheckboxTree
         key={ key } name={ key } label={ startCase(key) }
         items={ filter.items }
         onChange={ onChange }
         defaultValues={ Array.isArray(values) ? values : [values] } />
    );
  });

  return (
    <div className="mi-search__filter-container">
      <div className="mi-search__filter">
        <header>Filter Results</header>
        { checkboxTrees }
      </div>
    </div>
  );
};

export default Filter;
