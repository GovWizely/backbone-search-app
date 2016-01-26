import _ from 'lodash';
import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import Card from '../components/card';
import { resources } from '../config';

var Deck = React.createClass({
  displayName: 'Deck',
  propTypes: {
    query: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
  },
  render: function() {
    const { query, results } = this.props;
    return (
      <div className="mi-deck">
        {
          _.map(resources, function(resource) {
            const { displayName, fields, pathname, stateKey } = resource;
            const { isFetching, items } = results[stateKey];
            const url = `#/search/${pathname}?${stringify(query)}`;
            if (isFetching || !items.length) return null;
            return [
              <Card
                id={ stateKey }
                fields={ fields }
                items={ items }
                key={ stateKey }
                label={ displayName }
                url={ url }
                />
            ];
          })
        }
      </div>
    );
  }
});

export default Deck;
