import { intersection, isEmpty, keys, reduce } from 'lodash';
import React from 'react';

import Deck from './deck';
import Result from './result';
import NoResult from './no_result';
import Spinner from '../../components/spinner';

function verticalAlignMiddle(component, height=400) {
  return (
    <div className="uk-vertical-align" style={ { height: height }}>
      <div className="uk-vertical-align-middle" style={ { width: '100%' } }>
        { component }
      </div>
    </div>
  );
}

function contentType(props) {
  const { results, selectedAPIs } = props;

  // wait for all the responses to be returned before showing any result.
  for (let selectedAPI of selectedAPIs) {
    if (results[selectedAPI.uniqueId].isFetching) return 'loading';
  }

  // no result if no results is not empty.
  if (!reduce(selectedAPIs, (output, selectedAPI) => {
    return output || !isEmpty(results[selectedAPI.uniqueId].items);
  }, false)) return 'noResult';

  if (selectedAPIs.length > 1 &&
      reduce(selectedAPIs, (output, selectedAPI) => {
        if (!isEmpty(results[selectedAPI.uniqueId].items)) output += 1;
        return output;
      }, 0).length > 1) return 'deck';

  return 'result';
}

var Content = (props) => {
  const { filters, findTemplate, onClearFilter, onPaging, onSelect, query, results, selectedAPIs, window } = props;

  let content = null;
  switch(contentType(props)) {
  case 'deck':
    content = (
      <Deck apis={ selectedAPIs } findTemplate={ findTemplate } onClick={ onSelect } results={ results } />
    );
    break;

  case 'result':
    content = (
      <Result
         api={ selectedAPIs[0] }
         findTemplate={ findTemplate }
         onPaging={ onPaging }
         query={ query }
         result={ results[selectedAPIs[0].uniqueId] }
         window={ window } />
    );
    break;

  case 'loading':
    content = verticalAlignMiddle(<Spinner />);
    break;

  case 'noResult':
  default:
    let actionable = intersection(keys(filters), keys(query)).length > 0;
    content = <NoResult actionable={ actionable } keyword={ query.q } onClick={ onClearFilter } />;
    break;
  }

  return (
    <div className="mi-search__content-container">
      <div className="mi-search__content">
        { content }
      </div>
    </div>
  );
};

export default Content;
