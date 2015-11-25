import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import { cards } from '../config';
import Card from '../components/card';
import resources from '../resources';

var Cards = React.createClass({
  displayName: 'Cards',
  propTypes: {
    query: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
  },
  render: function() {
    const { query, results } = this.props;
    return (
      <div className="cards">
        {
          cards.map(function(card) {
            const { displayName, fields, stateKey } = resources[card];
            const { isFetching, items } = results[stateKey];
            const url = `#/search/${card}?${stringify(query)}`;
            if (isFetching || !items.length) return null;
            return [
              <Card
                id={ card }
                fields={ fields }
                items={ items }
                key={ card }
                label={ displayName }
                url={ url }
                />,
              <hr />
            ];
          })
        }
      </div>
    );
  }
});

export default Cards;
