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
      <li className="mi-query-expansion__list__item">
        <a onClick={ this._onClick }>{ label }</a>
      </li>
    );
  }
}

QueryExpansionTerm.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const QueryExpansion = ({ onClick, queryExpansions }) => {
  if (!queryExpansions) return null;

  const { invalidated, isFetching, items } = queryExpansions;
  if (invalidated || isFetching || !items) return null;

  const terms = map(items, (region) => {
    const key = keys(region)[0];
    const value = region[key];
    return <QueryExpansionTerm key={ key } label={ key } onClick={ onClick } value={ value } />;
  });

  if (isEmpty(terms)) return null;
  return (
    <div className="mi-query-expansion">Expand Search To:
      <ul className="mi-query-expansion__list">
        { terms }
      </ul>
    </div>
  );
};

QueryExpansion.propTypes = {
  onClick: PropTypes.func.isRequired,
  queryExpansions: PropTypes.object
};

export default QueryExpansion;
