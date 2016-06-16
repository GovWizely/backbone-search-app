import React, { PropTypes } from 'react';
import ResultList from './result-list';

const Card = ({ displayedItems, isFetching, items, label, onClick, options, template }) => {
  if (isFetching || !items.length) return <noscript />;

  const modifier = (
    options.mode === 'horizontal' ?
      'mi-card mi-card--horizontal' :
      'mi-card mi-card--vertical'
  );
  const header = options.header || label;
  const footer = options.footer || `See More ${label}`;
  const count = options.count || displayedItems;

  return (
    <section className={ modifier }>
      <header className="mi-card__header" title={ header }>{ header }</header>

      <div className="mi-card__box">
        <div className="mi-card__content">
          <ResultList
            displayedItems={ count }
            items={ items }
            template={ template }
          />
        </div>

        <footer className="mi-card__footer">
          <a onClick={ onClick }>{ footer }</a>
        </footer>
      </div>
    </section>
  );
};

Card.propTypes = {
  displayedItems: PropTypes.number,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.object,
  template: PropTypes.func.isRequired
};

Card.defaultProps = {
  displayedItems: 5,
  items: [],
  label: 'Untitled'
};

export default Card;
