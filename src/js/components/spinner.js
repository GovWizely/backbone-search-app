require('./styles/spinner.scss');

import React, { PropTypes } from 'react';

const Bounce = (
  <div className="sk-bounce">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
);

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

function createSpinner(type) {
  return ({ message='Loading...' }) => {
    return (
      <div>
        { type }
        <div className="uk-text-center" style={ { color: '#666' }}>{ message }</div>
      </div>
    );
  };
}

export const BounceSpinner = createSpinner(Bounce);
export default createSpinner(Circle);
