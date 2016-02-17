require('./styles/spinner.scss');

import React, { PropTypes } from 'react';

const FoldingCube = (
  <div className="sk-folding-cube">
    <div className="sk-cube sk-cube1"></div>
    <div className="sk-cube sk-cube2"></div>
    <div className="sk-cube sk-cube4"></div>
    <div className="sk-cube sk-cube3"></div>
  </div>
);

const Circle = (
  <div className="sk-circle">
    <div className="sk-circle1 sk-child"></div>
    <div className="sk-circle2 sk-child"></div>
    <div className="sk-circle3 sk-child"></div>
    <div className="sk-circle4 sk-child"></div>
    <div className="sk-circle5 sk-child"></div>
    <div className="sk-circle6 sk-child"></div>
    <div className="sk-circle7 sk-child"></div>
    <div className="sk-circle8 sk-child"></div>
    <div className="sk-circle9 sk-child"></div>
    <div className="sk-circle10 sk-child"></div>
    <div className="sk-circle11 sk-child"></div>
    <div className="sk-circle12 sk-child"></div>
  </div>
);

var Spinner = ({ message }) => {
  return (
    <div>
      { Circle }
      <div className="uk-text-center" style={ { color: '#666' }}>{ message }</div>
    </div>
  );
};

Spinner.propTypes = {
  message: PropTypes.string
};

Spinner.DefaultProps = {
  message: 'Loading...'
};

export default Spinner;
