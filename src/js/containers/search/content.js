import { isEmpty, reduce } from 'lodash';
import React, { PropTypes } from 'react';

import Deck from './deck';
import Result from './result';
import NoResult from './no_result';
import Spinner from '../../components/spinner';

function contentType(props) {
  const { results, selectedAPIs } = props;

  // wait for all the responses to be returned before showing any result.
  for (const { uniqueId } of selectedAPIs) {
    if (results[uniqueId].isFetching) return { type: 'loading' };
  }

  const matchedAPIs = reduce(selectedAPIs, (output, selectedAPI) => {
    const matched = !isEmpty(results[selectedAPI.uniqueId].items);
    return matched ? output.concat(selectedAPI) : output;
  }, []);

  if (matchedAPIs.length === 0) return { type: 'noResult' };

  if (selectedAPIs.length > 1 && matchedAPIs.length > 1) return { type: 'deck', matchedAPIs };

  return { type: 'result', matchedAPIs };
}

const Content = ({ findTemplate, onPaging, onSelect, query, results, selectedAPIs, window }) => {
  let content = null;
  const { type, matchedAPIs } = contentType({ results, selectedAPIs });
  switch (type) {
  case 'deck':
    content = (
      <Deck
        apis={matchedAPIs}
        findTemplate={findTemplate}
        onClick={onSelect}
        results={results}
      />
    );
    break;

  case 'result':
    content = (
      <Result
        api={matchedAPIs[0]}
        findTemplate={findTemplate}
        onPaging={onPaging}
        query={query}
        result={results[matchedAPIs[0].uniqueId]}
        window={window}
      />
    );
    break;

  case 'loading':
    content = (
      <div className="mi-search__spinner-container">
        <Spinner />
      </div>
    );
    break;

  case 'noResult':
  default:
    content = <NoResult />;
    break;
  }

  return content;
};

Content.propTypes = {
  findTemplate: PropTypes.func.isRequired,
  onPaging: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  selectedAPIs: PropTypes.array.isRequired,
  window: PropTypes.object.isRequired
};

export default Content;
