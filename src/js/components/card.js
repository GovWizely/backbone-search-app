import React, { PropTypes } from 'react';
import ResultList from './result-list';

const View = ({ displayedItems, isFetching, items, template }) => {
  if (isFetching || !items.length) return <noscript />;

  return (
    <div className="mi-card__content">
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
    <header className="mi-card__header" title={ label }>{ label }</header>

    <div className="mi-card__box">
      <View
        displayedItems={ displayedItems }
        isFetching={ isFetching }
        items={ items }
        label={ label }
        template={ template }
      />

      <footer className="mi-card__footer">
        <a onClick={ onClick }>See More { label }</a>
      </footer>
    </div>
  </section>
);
Card.propTypes = {
  displayedItems: PropTypes.number,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  template: PropTypes.func.isRequired
};

Card.defaultProps = {
  displayedItems: 5,
  items: [],
  label: 'Untitled'
};

export default Card;
