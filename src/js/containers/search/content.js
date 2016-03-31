import { intersection, isEmpty, keys, reduce } from 'lodash';
import React, { PropTypes } from 'react';

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
      }, 0) > 1) return 'deck';

  return 'result';
}

var Content = (props) => {
  const { findTemplate, onPaging, onSelect, query, results, selectedAPIs, window } = props;

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
    content = <NoResult keyword={ query.q } />;
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
