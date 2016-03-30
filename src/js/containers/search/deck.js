import { compact, map } from 'lodash';
import React from 'react';

import Card from '../../components/card';

var Deck = ({ apis, findTemplate, onClick, results, visible }) => {
  const cards = compact(map(apis, (api) => {
    const { displayName, fields, pathname, uniqueId } = api;
    if (!results[uniqueId]) return null;

    const { isFetching, items } = results[uniqueId];
    if (!isFetching && !items.length) return null;

    const template = findTemplate(uniqueId).CardItem;
    return (
      <Card
         id={ uniqueId }
         isFetching={ isFetching }
         items={ items }
         key={ uniqueId }
         label={ displayName }
         template={ template }
         onClick={ onClick.bind(undefined, api) } />
    );
  }));

  return (
    <div className="mi-search__deck-container">
      <div className="mi-deck">
        { cards }
      </div>
    </div>
  );
};

export default Deck;
