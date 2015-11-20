import _ from 'lodash';
import assign from 'object-assign';
import { stringify } from 'querystring';
import React, { PropTypes } from 'react';

function href(location, offset) {
  const params = assign({}, location.query, { offset });
  return `/#${location.pathname}?${stringify(params)}`;
}

var Pagination = React.createClass({
  displayName: 'Pagination',
  getDefaultProps: function() {
    return {
      pageSize: 10,
      pageRange: 10
    };
  },
  render: function() {
    const { location, metadata: { offset, total }, pageSize } = this.props;
    const firstPage = 0,
          prevPage = offset - pageSize < 0 ? 0 : offset - pageSize,
          nextPage = offset + pageSize > total ? _.floor(total, -1) : offset + pageSize,
          lastPage = _.floor(total, -1);
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a className="fa fa-angle-double-left" href={ href(location, firstPage) }></a>
          </li>
          <li>
            <a className="fa fa-angle-left" href={ href(location, prevPage) }></a>
          </li>
          <li>
            <a className="fa fa-angle-right" href={ href(location, nextPage) }></a>
          </li>
          <li>
            <a className="fa fa-angle-double-right" href={ href(location, lastPage) }></a>
          </li>
        </ul>
      </nav>
    );
  }
});

Pagination.propTypes = {
  location: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  pageRange: PropTypes.number,
  pageSize: PropTypes.number
};

export default Pagination;
