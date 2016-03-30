import React, { PropTypes } from 'react';

import Message from '../../components/search-message';
import ResultList from '../../components/result-list';
import Pagination from '../../components/pagination';

function displayablePages(innerWidth) {
  if (innerWidth > 960) return 10;
  if (innerWidth > 768) return 8;
  return 5;
}

var Result = ({ api, findTemplate, onPaging, query, result, window }) => {
  if (result.isFetching || result.metadata.total === 0) return <noscript />;

  const template = findTemplate(api.uniqueId).ResultItem;
  return (
    <div className="mi-search__result">
      <Message
         apiName={ api.displayName }
         keyword={ query.q }
         total={ result.metadata.total } />

      <ResultList items={ result.items } template={ template } />

      <Pagination
         currentOffset={ result.metadata.offset }
         displayedPages={ displayablePages(window.innerWidth) }
         items={ result.metadata.total }
         itemsOnPage={ 10 }
         onClick={ onPaging }
         />
    </div>
  );
};

export default Result;
