import { map, range } from 'lodash';
import React, { PropTypes } from 'react';

function getRange(currentPage, displayedPages, pages, pivot) {
  const head = Math.ceil(
    currentPage > pivot ? Math.max(Math.min(currentPage - pivot, (pages - displayedPages)), 0) : 0
  );
  const tail = Math.ceil(
    currentPage > pivot ? Math.min(currentPage + pivot, pages) : Math.min(displayedPages, pages)
  );

  return range(head, tail);
}

const Page = ({ className, isActive, isVisible, label, offset, onClick, title }) => {
  if (!isVisible) return <noscript />;

  const itemClassName = isActive ?
    'mi-pagination__item mi-pagination__item--active' :
    'mi-pagination__item';
  return (
    <li className={itemClassName}>
      <a className={className} data-offset={offset} onClick={onClick} title={title}>
        {label}
      </a>
    </li>
  );
};
Page.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isVisible: PropTypes.bool,
  label: PropTypes.string,
  offset: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string
};
Page.defaultProps = {
  isActive: false,
  isVisible: true,
  label: ''
};

const Pagination = ({ currentOffset, displayedPages, items, itemsOnPage, onClick }) => {
  const pages = Math.ceil(items / itemsOnPage);
  const currentPage = Math.ceil(currentOffset / itemsOnPage);
  const pivot = displayedPages / 2;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  if (pages <= 1) return <noscript />;

  const pageRange = getRange(currentPage, displayedPages, pages, pivot);

  const pageList = [
    <Page
      key="first"
      className="mi-icon mi-icon-angle-double-left"
      isVisible={currentPage !== 0}
      offset={0}
      onClick={onClick}
      title="First Page"
    />,
    <Page
      key="prev"
      className="mi-icon mi-icon-angle-left"
      isVisible={currentPage !== 0}
      offset={prevPage * itemsOnPage}
      onClick={onClick}
      title="Previous Page"
    />,

    map(pageRange, (index) => (
      <Page
        key={index}
        isActive={currentPage === index}
        label={`${index + 1}`}
        offset={index * itemsOnPage}
        onClick={onClick}
        title={`Page #${index + 1}`}
      />
    )),

    <Page
      key="next"
      className="mi-icon mi-icon-angle-right"
      isVisible={currentPage !== pages - 1}
      offset={nextPage * itemsOnPage}
      onClick={onClick}
      title="Next Page"
    />,
    <Page
      key="last"
      className="mi-icon mi-icon-angle-double-right"
      isVisible={currentPage !== pages - 1}
      offset={(pages - 1) * itemsOnPage}
      onClick={onClick}
      title="Last Page"
    />
  ];

  return (
    <ul className="mi-pagination">
      {pageList}
    </ul>
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
