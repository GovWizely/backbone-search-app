import _ from 'lodash';
import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import Card from '../components/card';
import { template } from '../templates';

var Deck = React.createClass({
  displayName: 'Deck',
  propTypes: {
    apis: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
  },
  render: function() {
    const { query, apis, results } = this.props;
    const children = _.compact(_.map(apis, function(api) {
      const { deckable, displayName, fields, pathname, uniqueId } = api;
      if (!deckable) return null;

      const { isFetching, items } = results[uniqueId];
      const _template = template(api.uniqueId).CardItem;
      const url = `#/search/${pathname}?${stringify(query)}`;
      return [
        <Card
           id={ uniqueId }
           isFetching={ isFetching }
           items={ items }
           key={ uniqueId }
           label={ displayName }
           template={ _template }
           url={ url } />
      ];
    }));

    return <div className="mi-deck">{ children }</div>;
  }
});

export default Deck;
