import _ from 'lodash';
import assign from 'object-assign';
import { stringify } from 'querystring';
import React, { PropTypes } from 'react';

function href(pathname, query, offset) {
  const params = assign({}, query, { offset });
  return `${pathname}?${stringify(params)}`;
}

function findRange(current, total, range) {
  if (total <= range) return { head: 1, tail: total };

  const pivot = _.ceil(range / 2);
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
  const totalPage = _.ceil(total / options.size),
        currentPage = _.ceil(offset / options.size);
  const { head, tail } = findRange(currentPage, totalPage, options.range);
  const pages = _.range(head, tail + 1).map(i =>  {
    let pageOffset = (i - 1)  * options.size;
    let activeCss = pageOffset == offset ? 'active' : '';
    return (
      <li className={ activeCss } key={ i }>
        <a href={ href(options.pathname, options.query, pageOffset) }>{ i }</a>
      </li>
    );
  });
  return  pages;
}

var Pagination = React.createClass({
  displayName: 'Pagination',
  propTypes: {
    metadata: PropTypes.object.isRequired,
    options: PropTypes.object,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired
  },
  getDefaultProps: function() {
    return {
      options: {
        range: 10,
        size: 10
      }
    };
  },
  render: function() {
    const { pathname, query, metadata: { offset, total }, options: { range, size } } = this.props;
    const firstPage = 0,
          prevPage = offset - size < 0 ? 0 : offset - size,
          nextPage = offset + size > total ? _.floor(total, -1) : offset + size,
          lastPage = _.floor(total, -1);
    return (
      <nav>
        <ul className="mi-pagination">
          <li>
            <a className="fa fa-angle-double-left" href={ href(pathname, query, firstPage) }></a>
          </li>
          <li>
            <a className="fa fa-angle-left" href={ href(pathname, query, prevPage) }></a>
          </li>

          { pageItems(offset, total, { pathname, query, range, size })}

          <li>
            <a className="fa fa-angle-right" href={ href(pathname, query, nextPage) }></a>
          </li>
          <li>
            <a className="fa fa-angle-double-right" href={ href(pathname, query, lastPage) }></a>
          </li>
        </ul>
      </nav>
    );
  }
});

export default Pagination;
