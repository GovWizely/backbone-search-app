import React, { PropTypes } from 'react';

const QueryPrompt = ({ q }) => {
  if (q) return null;

  return (
    <div className="mi-query-prompt">
      Please enter a search term in the box above.
    </div>
  );
};

QueryPrompt.propTypes = {
  q: PropTypes.string
};

export default QueryPrompt;
