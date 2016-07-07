import React, { PropTypes } from 'react';

const QueryPrompt = ({ query, selectedAPIs }) => {
  if (query.q) return null;
  for (const api of selectedAPIs) {
    if (api.isValidQuery(query)) return null;
  }

  return (
    <div className="mi-query-prompt">
      Please enter a search term in the box above.
    </div>
  );
};

QueryPrompt.propTypes = {
  query: PropTypes.object,
  selectedAPIs: PropTypes.array
};

export default QueryPrompt;
