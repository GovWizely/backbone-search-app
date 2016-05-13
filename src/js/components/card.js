import React, { PropTypes } from 'react';
import ResultList from './result-list';
import DisplayMode from '../enums/DisplayMode';

const Card = ({ displayMode, displayedItems, isFetching, items, label, onClick, template }) => {
  if (isFetching || !items.length) return <noscript />;

  const modifier = (
    displayMode === DisplayMode.CARD_HORIZONTAL ?
      'mi-card mi-card--horizontal' :
      'mi-card mi-card--vertical'
  );

  return (
    <section className={ modifier }>
      <header className="mi-card__header" title={ label }>{ label }</header>

      <div className="mi-card__box">
        <div className="mi-card__content">
          <ResultList
            displayedItems={ displayedItems }
            items={ items }
            template={ template }
          />
        </div>

        <footer className="mi-card__footer">
          <a onClick={ onClick }>See More { label }</a>
        </footer>
      </div>
    </section>
  );
};

Card.propTypes = {
  displayMode: PropTypes.string,
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
