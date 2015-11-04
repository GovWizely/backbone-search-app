import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AggregationSelect from '../../src/js/components/aggregation-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

describe('AggregationSelect', () => {
  it('renders a select component with options', () => {
    var items = [
      { key: 'Item#1' },
      { key: 'Item#2' },
      { key: 'Item#3' }
    ];
    const component = renderIntoDocument(
      <AggregationSelect items={ items }/>
    );

    const selectDOM = findRenderedDOMComponentWithClass(component, 'Select');
    expect(selectDOM).to.not.equal(null);
  });
});
