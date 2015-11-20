import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import Card from '../components/card';
import resources from '../resources';

const cards = ['trade_events', 'trade_leads'];

var Cards = React.createClass({
  displayName: 'Cards',
  render: function() {
    const { query, results } = this.props;
    return (
      <div className="cards">
        {
          cards.map(function(card) {
            const { displayName, fields, stateKey } = resources[card];
            const { items } = results[stateKey];
            const url = `/#/search/${card}?${stringify(query)}`;
            if (!items.length) return null;
            return (
              <Card
                id={ card }
                fields={ fields }
                items={ items }
                key={ card }
                label={ displayName }
                url={ url }
               />
            );
          })
        }
      </div>
    );
  }
});

Cards.propTypes = {
  query: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired
};

export default Cards;
