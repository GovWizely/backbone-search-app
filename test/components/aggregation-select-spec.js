import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AggregationSelect from '../../src/js/components/aggregation-select';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = TestUtils;

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

    const selectDOM = scryRenderedDOMComponentsWithTag(component, 'Select');
    expect(selectDOM.length).to.equal(1);
  });
});
