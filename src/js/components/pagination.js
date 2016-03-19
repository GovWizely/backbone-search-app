require('./styles/pagination.scss');

import _ from 'lodash';
import assign from 'object-assign';
import { stringify } from 'querystring';
import React, { PropTypes } from 'react';

function href(pathname, query, offset) {
  const params = assign({}, query, { offset });
  return `${pathname}?${stringify(params)}`;
}

function getRange(currentPage, displayedPages, pages, pivot) {
  const head = Math.ceil(
    currentPage > pivot ? Math.max(Math.min(currentPage - pivot, (pages - displayedPages)), 0) : 0
  );
  const tail = Math.ceil(
    currentPage > pivot ? Math.min(currentPage + pivot, pages) : Math.min(displayedPages, pages)
  );

  return _.range(head, tail);
}

var Pagination = ({ currentOffset, displayedPages, items, itemsOnPage, onClick, query, url }) => {
  const pages = Math.ceil(items / itemsOnPage),
        currentPage = Math.ceil(currentOffset / itemsOnPage),
        pivot = displayedPages / 2,
        nextPage = currentPage + 1,
        prevPage = currentPage - 1;
  if (pages <= 1) return <span />;

  const range = getRange(currentPage, displayedPages, pages, pivot);

  const pageList = [
    currentPage !== 0 ? (
      <li key="first">
        <a title="First Page" className="mi-icon mi-icon-angle-double-left" data-offset="0" onClick={ onClick }></a>
      </li>) : null,

    currentPage !== 0 ? (
      <li key="prev">
        <a title="Previous Page" className="mi-icon mi-icon-angle-left" data-offset={ prevPage * itemsOnPage } onClick={ onClick }></a>
      </li>) : null,

    range.map(i => {
      const activeCSS = currentPage === i ? 'mi-active' : '';
      return (
        <li className={ activeCSS } key={ i }>
          <a title={ `Page #${i + 1}`} data-offset={ i * itemsOnPage } onClick={ onClick }>{ i + 1 }</a>
        </li>
      );
    }),

    currentPage !== pages - 1 ? (
      <li key="next">
        <a title="Next Page" className="mi-icon mi-icon-angle-right" data-offset={ nextPage * itemsOnPage } onClick={ onClick }></a>
      </li>) : null,
    currentPage !== pages - 1 ?(
      <li key="last">
        <a title="Last Page" className="mi-icon mi-icon-angle-double-right" data-offset={ (pages - 1) * itemsOnPage } onClick={ onClick }></a>
      </li>) : null
  ];

  return (
    <nav style={ { width: '100%' }}>
      <ul className="mi-pagination">
        { pageList }
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentOffset: PropTypes.number,
  displayedPages: PropTypes.number,
  items: PropTypes.number.isRequired,
  itemsOnPage: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  currentOffset: 0,
  displayedPages: 10,
  items: 0,
  itemsOnPage: 10
};

export default Pagination;
