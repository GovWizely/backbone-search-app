import _ from 'lodash';
import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

import Card from '../components/card';
import { createResultFormatter } from '../utils/view-helper';

var Deck = React.createClass({
  displayName: 'Deck',
  propTypes: {
    apis: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired
  },
  render: function() {
    const { query, apis, results } = this.props;
    const children = _.map(apis, function(api) {
      const { displayName, fields, pathname, uniqueId } = api;
      const { isFetching, items } = results[uniqueId];
      const formatter = createResultFormatter(fields);
      const url = `#/search/${pathname}?${stringify(query)}`;
      if (isFetching || !items.length) return null;
      return [
        <Card
           id={ uniqueId }
           formatter={ formatter }
           items={ items }
           key={ uniqueId }
           label={ displayName }
           url={ url }/>
      ];
    });

    return <div className="mi-deck">{ children }</div>;
  }
});

export default Deck;
