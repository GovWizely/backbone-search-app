import { isEmpty } from 'lodash';
import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

const SearchMessage = ({ apiName, keyword, total }) => {
  if (total === null) return null;

  const message = [
    <strong key="total" className="mi-search-message__count">{ total } </strong>,

    <span key="message">
      { pluralize('result', total) } from
      the { apiName } were found
      { isEmpty(keyword) ? '.' : ' for ' }
    </span>,

    isEmpty(keyword) ?
      null :
      <strong key="keyword" className="mi-search-message__keyword">{ keyword }.</strong>
  ];

  return (
    <div className="mi-search-message">
      { message }
    </div>
  );
};

SearchMessage.propTypes = {
  apiName: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  total: PropTypes.number.isRequired
};

export default SearchMessage;
