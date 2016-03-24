import _ from 'lodash';
import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import Card from '../components/card';
import { template } from '../templates';

var Deck = React.createClass({
  displayName: 'Deck',
  propTypes: {
    apis: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired
  },
  render: function() {
    const { apis, onClick, results } = this.props;
    const children = _.compact(_.map(apis, function(api) {
      const { displayName, fields, pathname, uniqueId } = api;
      const { isFetching, items } = results[uniqueId];
      const _template = template(uniqueId).CardItem;
      if (!isFetching && !items.length) return null;

      return (
        <Card
           id={ uniqueId }
           isFetching={ isFetching }
           items={ items }
           key={ uniqueId }
           label={ displayName }
           template={ _template }
           onClick={ onClick.bind(undefined, api) } />
      );
    }));

    return <div className="mi-deck">{ children }</div>;
  }
});

export default Deck;
