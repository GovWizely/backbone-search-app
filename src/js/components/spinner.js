require('./styles/spinner.scss');

import React from 'react';

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

function createSpinner(type) {
  return ({ message = 'Loading...' }) => (
    <div className="mi-spinner">
      { type }
      <div style={ { color: '#666', textAlign: 'center' } }>{ message }</div>
    </div>
  );
}
const CircleSpinner = createSpinner(Circle);

export default CircleSpinner;
