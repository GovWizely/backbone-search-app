import _ from 'lodash';
import assign from 'object-assign';
import { stringify } from 'querystring';
import React, { PropTypes } from 'react';

function href(location, offset) {
  const params = assign({}, location.query, { offset });
  return `/#${location.pathname}?${stringify(params)}`;
}

function findRange(current, total, size) {
  if (total <= size) return { head: 1, tail: total };

  const pivot = _.ceil(size / 2);
  let head = current - pivot + 1,
      tail = current + pivot;
  const headOffset = 1 - head,
        tailOffset = tail - total;
  if (headOffset > 0) {
    head = 1;
    tail += headOffset;
  }
  if (tailOffset > 0) {
    tail = total;
    head -= tailOffset;
  }
  return { head, tail };
}

function pageItems(offset, total, options) {
  const totalPage = _.ceil(total / options.pageSize),
        currentPage = _.ceil(offset / options.pageSize);
  const { head, tail } = findRange(currentPage, totalPage, options.pageSize);
  const pages = _.range(head, tail + 1).map(i =>  {
    let pageOffset = (i - 1)  * options.pageSize;
    let activeCss = pageOffset == offset ? 'active' : '';
    return (
      <li className={ activeCss } key={ i }>
        <a href={ href(options.location, pageOffset) }>{ i }</a>
      </li>
    );
  });
  return  pages;
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
    const { location, metadata: { offset, total }, pageRange, pageSize } = this.props;
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

          { pageItems(offset, total, { location, pageRange, pageSize })}

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
