import React, { PropTypes } from 'react';

import ResultList from './result-list';
import Spinner from './spinner';

function noMatch(label) {
  return (
    <div className="no-match">
      <i className="mi-icon mi-icon-warning"></i>
      <br />
      No matching result found for
      <br />
      { label }.
    </div>
  );
}

function verticalAlignMiddle(component) {
  const style = { width: '100%' };
  return (
    <div className="content uk-vertical-align">
      <div className="uk-vertical-align-middle" style={ style }>
        { component }
      </div>
    </div>
  );
}

function view({ isFetching, items, displayedItems, template, url, label }) {
  if (isFetching) return verticalAlignMiddle(<Spinner message="Retrieving information..." />);

  if (!items.length) return verticalAlignMiddle(noMatch(label));

  return (
    <div className="content">
      <ResultList displayedItems={ displayedItems } items={ items } template={ template } />
      <div className="show-more">
        <a href={ url }>See More { label }</a>
      </div>
    </div>
  );
}

var Card = ({ isFetching, displayedItems, id, items, label, template, url }) => {
  return (
    <section className="mi-card">
      <header className="title">{ label }</header>

      { view({ isFetching, displayedItems, id, items, label, template, url }) }
    </section>
  );
};

Card.propTypes = {
  displayedItems: PropTypes.number,
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  template: PropTypes.func,
  url: PropTypes.string.isRequired
};

Card.defaultProps = {
  displayedItems: 4,
  items: [],
  label: 'Untitled'
};

export default Card;
