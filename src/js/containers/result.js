import React, { PropTypes } from 'react';
import { stringify } from 'querystring';

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
    const { resource, query, result, screen } = this.props;
    if (result.isFetching || result.metadata.total === 0) return null;
    return (
      <div key="result" className="mi-result">
        <Message
           resourceName={ resource.displayName }
           keyword={ query.q }
           total={ result.metadata.total } />

        <ResultList items={ result.items } fields={ resource.fields }/>

        <Pagination
           currentOffset={ result.metadata.offset }
           displayedPages={ 10 }
           items={ result.metadata.total }
           itemsOnPage={ 10 }
           url={ `#/${screen}/${resource.pathname}` }
           query={ query } />
      </div>
    );
  }
});

export default Result;
