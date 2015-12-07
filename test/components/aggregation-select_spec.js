import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AggregationSelect from '../../src/js/components/aggregation-select';
import Select from 'react-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

function setup(value) {
  let props = {
    items: [{ key: 'A' }, { key: 'B' }, { key: 'C' }],
    onChange: (val) => val
  };

  if (value) props.value = value;

  let renderer = TestUtils.createRenderer();
  renderer.render(<AggregationSelect { ...props } />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components', () => {
  describe('AggregationSelect', () => {

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type.displayName).to.equal('Select');
      expect(output.props.options).to.eql([
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' }
      ]);
    });

    context('when selected values are valid options', () => {
      it('should render with selected values', () => {
        const { output } = setup('A,B');

        expect(output.props.value).to.eql(['A', 'B']);
      });
    });

    context('when selected values are invalid options', () => {
      it('should render without selected values', () => {
        const { output } = setup('X,Y');

        expect(output.props.value).to.eql([]);
      });
    });

    it('should handle onChange event', () => {
      const { output } = setup();

      expect(output.props.onChange('A,B')).to.eql('A,B');
    });

    it('should handle onBlur event', () => {
      const { output } = setup();

      expect(output.props.onBlur()).to.be.undefined;
    });

  });
});
