import { isEmpty, map, reduce, startCase } from 'lodash';
import React, { PropTypes } from 'react';

import CheckboxTree from '../../components/checkbox-tree';

function noFilter(filters) {
  const allInvalidated = !reduce(
    filters,
    (output, filter) => output || !filter.invalidated,
    false);
  if (allInvalidated) return true;

  for (const name in filters) {
    if (!isEmpty(filters[name].items)) return false;
  }
  return true;
}

const Filter = ({ filters, onChange, onClear, query }) => {
  if (noFilter(filters)) return <noscript />;

  const checkboxTrees = map(filters, (filter, key) => {
    const values = query[key] || [];

    return (
      <CheckboxTree
        key={key} name={key} label={startCase(key)}
        items={filter.items} disabled={filter.invalidated || filter.isFetching}
        onChange={onChange}
        defaultValues={Array.isArray(values) ? values : [values]}
      />
    );
  });

  return (
    <div className="mi-search__filter-container">
      <div className="mi-filter">
        <header className="mi-filter__header">
          Filter Results
          &nbsp;<a className="mi-filter__header__link" onClick={onClear}>[Clear All]</a>
        </header>
        {checkboxTrees}
      </div>
    </div>
  );
};

Filter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

export default Filter;
