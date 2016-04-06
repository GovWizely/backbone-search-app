require('./styles/card.scss');

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
    <div className="mi-content uk-vertical-align">
      <div className="uk-vertical-align-middle" style={ style }>
        { component }
      </div>
    </div>
  );
}

const View = ({ displayedItems, isFetching, items, label, template }) => {
  if (isFetching) return verticalAlignMiddle(<Spinner message="Retrieving information..." />);

  if (!items.length) return verticalAlignMiddle(noMatch(label));

  return (
    <div className="mi-content">
      <ResultList
        displayedItems={ displayedItems }
        items={ items }
        template={ template }
      />
    </div>
  );
};
View.propTypes = {
  displayedItems: PropTypes.number,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  template: PropTypes.func.isRequired
};

const Card = ({ isFetching, displayedItems, items, label, onClick, template }) => (
  <section className="mi-card">
    <header className="title" title={ label }>{ label }</header>

    <View
      displayedItems={ displayedItems }
      isFetching={ isFetching }
      items={ items }
      label={ label }
      template={ template }
    />

    <footer>
      <a onClick={ onClick }>See More { label }</a>
    </footer>
  </section>
);
Card.propTypes = {
  displayedItems: PropTypes.number,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  template: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

Card.defaultProps = {
  displayedItems: 5,
  items: [],
  label: 'Untitled'
};

export default Card;
