import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Form } from '../../src/js/components/form';

function setup(expanded=true) {
  let renderer = TestUtils.createRenderer(),
      props = { fields: { q: {} }, expanded, handleSubmit: e => e };
  renderer.render(<Form {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('Form', () => {
  context('when form is condensed', () => {
    it('should render correctly', () => {
      let { output } = setup(false);
      expect(output.props.className).to.equal('mi-form mi-form-condensed');
    });
  });

  context('when form is expanded', () => {
    it('should render correctly', () => {
      let { output } = setup();
      expect(output.props.className).to.equal('mi-form mi-form-expanded');
    });
  });
});
