import _ from 'lodash';
import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

const SearchMessage = ({ apiName, keyword, total }) => {
  if (total === null) return null;

  const count = <strong className="uk-text-danger">{ total }</strong>;
  const message = `${pluralize('result', total)} from ` +
    `the ${apiName} were found ${(_.isEmpty(keyword) ? '.' : ' for')}`;
  const query =
    _.isEmpty(keyword) ? null : <strong className="uk-text-danger">{ keyword }.</strong>;

  return (
    <div className="mi-search-message">
      { count } { message } { query }
    </div>
  );
};

SearchMessage.propTypes = {
  apiName: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  total: PropTypes.number.isRequired
};

export default SearchMessage;
