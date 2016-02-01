import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import CheckboxTree from '../../src/js/components/checkbox-tree';

function setup(items={}) {
  let props = {
    itemCssClass: 'cssClass',
    itemLimit: 1,
    items,
    name: 'Checkbox',
    onChange: (e) => e
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CheckboxTree { ...props } />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components', () => {
  describe('CheckboxTree', () => {
    context('when items is not empty', () => {
      const { output } = setup({ 'Country #1': {}, 'Country #2': {} });
      it('should render correctly', () => {
        expect(output.type).to.equal('section');
      });
    });

    context('when items is empty', () => {
      const { output } = setup();
      it('should render null', () => {
        expect(output).to.equal(null);
      });
    });
  });
});
