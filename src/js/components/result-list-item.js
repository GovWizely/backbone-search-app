import _ from 'lodash';
import React, { PropTypes } from 'react';

import { findFirst } from '../utils/view-helper';

function renderMeta(meta) {
  const items = _.pick(meta, _.identity);
  if (_.isEmpty(items)) return null;
  return (
    <ul className="meta">
      { _(items).map(item => {
        return <li key={ item }>{ item }</li>;
      }).value() }
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
    const url = findFirst(item, fields.url),
          title = findFirst(item, fields.title),
          snippet = findFirst(item, fields.snippet),
          source = findFirst(item, fields.source);
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
