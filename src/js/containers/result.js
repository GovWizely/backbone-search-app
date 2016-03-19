import React, { PropTypes } from 'react';

import Message from '../components/search-message';
import ResultList from '../components/result-list';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';

import { template } from '../templates';

var Result = React.createClass({
  displayName: 'Result',
  propTypes: {
    api: PropTypes.object,
    onPaging: PropTypes.func.isRequired,
    query: PropTypes.object,
    result: PropTypes.object,
    window: PropTypes.object
  },
  displayedPages: function() {
    const { innerWidth } = this.props.window;
    if (innerWidth > 960) return 10;
    if (innerWidth > 768) return 8;
    return 5;
  },
  render: function() {
    const { api, onPaging, query, result, window } = this.props;
    if (result.isFetching || result.metadata.total === 0) return null;

    const _template = template(api.uniqueId).ResultItem;

    return (
      <div key="result" className="mi-result">
        <Message
           apiName={ api.displayName }
           keyword={ query.q }
           total={ result.metadata.total } />

        <ResultList items={ result.items } template={ _template } />

        <Pagination
           currentOffset={ result.metadata.offset }
           displayedPages={ this.displayedPages() }
           items={ result.metadata.total }
           itemsOnPage={ 10 }
           onClick={ onPaging }
         />
      </div>
    );
  }
});

export default Result;
