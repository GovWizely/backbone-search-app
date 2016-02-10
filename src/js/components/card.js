import React, { PropTypes } from 'react';

import ResultList from './result-list';

var Card = ({ displayedItems, id, items, label, template, url }) => {
  return (
    <section className="mi-card">
      <h4 className="title">{ label }</h4>

      <ResultList displayedItems={ 3 } items={ items } template={ template } />
      <div className="show-more">
        <a href={ url }>See More { label }</a>
      </div>
    </section>
  );
};

Card.propTypes = {
  displayedItems: PropTypes.number,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string.isRequired
};

Card.defaultProps = {
  displayedItems: 3,
  items: [],
  label: 'Untitled'
};

export default Card;
