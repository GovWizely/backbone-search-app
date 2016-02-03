import React, { PropTypes } from 'react';

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
    screen: PropTypes.string,
    window: PropTypes.object
  },
  displayedPages: function() {
    const { innerWidth } = this.props.window;
    if (innerWidth > 960) return 10;
    if (innerWidth > 768) return 8;
    return 5;
  },
  render: function() {
    const { resource, query, result, screen, window } = this.props;
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
           displayedPages={ this.displayedPages() }
           items={ result.metadata.total }
           itemsOnPage={ 10 }
           url={ `#/search/${resource.pathname}` }
           query={ query } />
      </div>
    );
  }
});

export default Result;
