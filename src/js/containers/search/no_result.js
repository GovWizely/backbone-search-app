import React from 'react';

var NoResult = ({ actionable, keyword, onClick=null }) => {
  const action = actionable && onClick ? <a onClick={ onClick }>Remove all filters.</a> : null;
  return (
    <div className="mi-search__no-result">
      Your search did not match any document. { action }
    </div>
  );
};

export default NoResult;
