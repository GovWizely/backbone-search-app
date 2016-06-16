import React, { PropTypes } from 'react';

const QueryPrompt = ({ q, selectedAPIs }) => {
  if (q ||
      selectedAPIs.length === 1 && selectedAPIs[0].requiredParams.indexOf('q') === -1
     ) return null;

  return (
    <div className="mi-query-prompt">
      Please enter a search term in the box above.
    </div>
  );
};

QueryPrompt.propTypes = {
  q: PropTypes.string,
  selectedAPIs: PropTypes.array
};

export default QueryPrompt;
