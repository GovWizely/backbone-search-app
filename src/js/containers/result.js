import React, { PropTypes } from 'react';

import { page } from '../config';
import Message from '../components/search-message';
import ResultList from '../components/result-list';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';

var Result = React.createClass({
  displayName: 'Result',
  propTypes: {
    query: PropTypes.object,
    resource: PropTypes.object,
    result: PropTypes.object,
    screen: PropTypes.string
  },
  render: function() {
    const { resource, query, result } = this.props;
    if (result.isFetching) return <Spinner key="spinner" />;
    return (
      <div key="result">
        <Message
          keyword={ query.q }
          total={ result.metadata.total }
        />
        <ResultList items={ result.items } fields={ resource.fields }/>
        <Pagination
          metadata={ result.metadata }
          pathname={ `#/${screen}/${resource.pathname}` }
          query={ query }
          options={ page } />
      </div>
    );
  }
});

export default Result;
