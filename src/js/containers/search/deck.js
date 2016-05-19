import { compact, map } from 'lodash';
import React, { PropTypes } from 'react';

import Card from '../../components/card';

const Deck = ({ apis, findTemplate, onClick, results }) => {
  const cards = compact(map(apis, (api) => {
    const { card, displayName, uniqueId } = api;

    if (!results[uniqueId] || card.enable === false) return null;

    const { isFetching, items } = results[uniqueId];
    if (!isFetching && !items.length) return null;

    const template = findTemplate(uniqueId).CardItem;
    const _onClick = onClick.bind(undefined, api);
    return (
      <Card
        id={ uniqueId }
        isFetching={ isFetching }
        items={ items }
        key={ uniqueId }
        label={ displayName }
        template={ template }
        onClick={ _onClick }
        options={ card }
      />
    );
  }));

  return (
    <div className="mi-search__deck-container">
      { cards }
    </div>
  );
};

Deck.propTypes = {
  apis: PropTypes.array.isRequired,
  findTemplate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired
};

export default Deck;
