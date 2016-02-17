import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Header from '../../src/js/components/header';

function setup() {
  let props = {
    cssClass: 'css',
    onClick: (e) => e
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Header { ...props } />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components/Header', () => {
  it('should render correctly', () => {
    const { output } = setup();
    expect(output.type).to.equal('header');
  });
});
