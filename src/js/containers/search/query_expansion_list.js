require('./styles/query_expansion_list.scss');

import { isEmpty, keys, map } from 'lodash';
import React, { PropTypes } from 'react';

class QueryExpansionTerm extends React.Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  _onClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.value);
  }
  render() {
    const { label } = this.props;
    return (
      <li><a onClick={ this._onClick }>{ label }</a></li>
    );
  }
}

QueryExpansionTerm.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const QueryExpansion = ({ onClick, queryExpansions }) => {
  const { invalidated, isFetching, items } = queryExpansions;
  if (invalidated || isFetching || !items) return <noscript />;

  let terms = map(items.world_regions, (region) => {
    const key = keys(region)[0];
    const value = region[key];
    return <QueryExpansionTerm key={ key } label={ key } onClick={ onClick } value={ value } />;
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

QueryExpansion.propTypes = {
  onClick: PropTypes.func.isRequired,
  queryExpansions: PropTypes.object.isRequired
};

export default QueryExpansion;
