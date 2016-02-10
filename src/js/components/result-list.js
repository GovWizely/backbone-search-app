import React, { PropTypes } from 'react';

var ResultList = ({ displayedItems, items, template }) => {
  const slicedItems = displayedItems < 0 ? items : items.slice(0, displayedItems);
  const resultItems = slicedItems.map((item, index) => {
    return <li key={ index }>{ template(item) }</li>;
  });
  return (
    <ul className="mi-list mi-result-list">
      { resultItems }
    </ul>
  );
};

ResultList.propTypes = {
  displayedItems: PropTypes.number,
  items: PropTypes.array.isRequired,
  template: PropTypes.func.isRequired
};

ResultList.defaultProps = {
  displayedItems: -1,
  items: []
};


export default ResultList;
