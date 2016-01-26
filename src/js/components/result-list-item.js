import _ from 'lodash';
import React, { PropTypes } from 'react';

import { formatResult } from '../utils/view-helper';

function renderMeta(meta) {
  const items = _.pick(meta, _.identity);
  if (_.isEmpty(items)) return null;
  return (
    <ul className="meta">
      { _.map(items, item => (<li key={ item }>{ item }</li>)) }
    </ul>
  );
}

var ResultListItem = React.createClass({
  displayName: 'ResultListItem',
  propTypes: {
    fields: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  },
  render: function() {
    const { fields, item } = this.props;
    const { snippet, source, title, url } = formatResult(item, fields);
    return (
      <article className="mi-result-list-item">
        <h1 className="title">
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ url }>{ url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: snippet } }></p>
        { renderMeta({ source }) }
      </article>
    );
  }
});


export default ResultListItem;
