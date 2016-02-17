require('./styles/header.scss');

import React from 'react';

var Header = () => {
  return (
    <header className="mi-header" role="banner">
      <a href="#">
        Market Intelligence Search <span className="mi-header-version">beta</span>
      </a>
    </header>
  );
};

export default Header;
