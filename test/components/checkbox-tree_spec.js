import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import CheckboxTree from '../../src/js/components/checkbox-tree';

function setup() {
  let props = {
    items: {},
    onChange: (e) => e
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CheckboxTree { ...props } />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components', () => {
  describe('CheckboxTree', () => {

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).to.equal('section');
    });
  });
});
