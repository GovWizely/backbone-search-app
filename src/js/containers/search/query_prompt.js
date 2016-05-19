import React, { PropTypes } from 'react';

const QueryPrompt = ({ q }) => {
  if (q) return null;

  return (
    <div>Please enter a search term in the box above.</div>
  );
};

QueryPrompt.propTypes = {
  q: PropTypes.string
};

export default QueryPrompt;
