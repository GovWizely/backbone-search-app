import React, { PropTypes } from 'react';

import Message from '../../components/search-message';
import ResultList from '../../components/result-list';
import Pagination from '../../components/pagination';

function displayablePages(innerWidth) {
  if (innerWidth > 960) return 10;
  if (innerWidth > 768) return 8;
  return 5;
}

const Result = ({ api, findTemplate, onPaging, query, result, window }) => {
  if (result.isFetching || result.metadata.total === 0) return <noscript />;

  const { ResultItem, getOptions } = findTemplate(api.uniqueId);

  let options = {}; if (getOptions) {
    options = getOptions({ api, findTemplate, onPaging, query, result, window });
  }
  return (
    <div className="mi-search__result">
      <div className="mi-search__search-message-container">
        <Message
          apiName={api.displayName}
          keyword={query.q}
          total={result.metadata.total}
        />
      </div>

      <div className="mi-search__result-list-container">
        <ResultList items={ result.items } template={ ResultItem } options={ options } />
      </div>

      <div className="mi-search__pagination-container">
        <Pagination
          currentOffset={result.metadata.offset}
          displayedPages={displayablePages(window.innerWidth)}
          items={result.metadata.total}
          itemsOnPage={10}
          onClick={onPaging}
        />
      </div>
    </div>
  );
};

Result.propTypes = {
  api: PropTypes.object.isRequired,
  findTemplate: PropTypes.func.isRequired,
  onPaging: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  window: PropTypes.object.isRequired
};

export default Result;
