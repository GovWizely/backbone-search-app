import React, { PropTypes } from 'react';

import Message from '../components/search-message';
import ResultList from '../components/result-list';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';

import templates from '../templates';

import { createResultFormatter } from '../utils/view-helper';

var Result = React.createClass({
  displayName: 'Result',
  propTypes: {
    query: PropTypes.object,
    api: PropTypes.object,
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
    const { api, query, result, screen, window } = this.props;
    if (result.isFetching || result.metadata.total === 0) return null;

    const formatter = createResultFormatter(api.fields);
    return (
      <div key="result" className="mi-result">
        <Message
           apiName={ api.displayName }
           keyword={ query.q }
           total={ result.metadata.total } />

        <ResultList formatter={ formatter } items={ result.items } />

        <Pagination
           currentOffset={ result.metadata.offset }
           displayedPages={ this.displayedPages() }
           items={ result.metadata.total }
           itemsOnPage={ 10 }
           url={ `#/search/${api.pathname}` }
           query={ query } />
      </div>
    );
  }
});

export default Result;
