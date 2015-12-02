import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AggregationSelect from '../../src/js/components/aggregation-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

function setup() {
  let props = {
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<AggregationSelect { ...props} />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components', () => {
  describe('AggregationSelect', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type.displayName).to.equal('Select');
    });
  });
});
