import React, { PropTypes } from 'react';

const ResultList = ({ displayedItems, items, template, options }) => {
  const slicedItems = displayedItems < 0 ? items : items.slice(0, displayedItems);
  const resultItems = slicedItems.map((item, index) => (
    <li key={ index }>{ template(item, options) }</li>
  ));

  return (
    <ul className="mi-result-list">
      { resultItems }
    </ul>
  );
};

ResultList.propTypes = {
  displayedItems: PropTypes.number,
  items: PropTypes.array.isRequired,
  options: PropTypes.object,
  template: PropTypes.func.isRequired
};

ResultList.defaultProps = {
  displayedItems: -1,
  items: [],
  options: {}
};


export default ResultList;
