import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AggregationSelect from '../../src/js/components/aggregation-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

describe('AggregationSelect', () => {
  var props = {
    items: [
      { key: 'Item#1' },
      { key: 'Item#2' },
      { key: 'Item#3' }
    ],
    values: '',
    onChange: () => { return true; }
  };

  it('renders a select component', () => {
    const component = renderIntoDocument(
      <AggregationSelect {...props} />
    );

    const selectDOM = findRenderedDOMComponentWithClass(component, 'Select-control');
    expect(selectDOM).to.not.equal(null);
  });

  it('renders a select component with options', () => {
    var items = props.items;
    const component = renderIntoDocument(
      <AggregationSelect {...props} />
    );

    expect(component.options()).to.include(
      { label: items[0].key, value: items[0].key },
      { label: items[1].key, value: items[1].key },
      { label: items[2].key, value: items[2].key }
    );
  });

  it.skip('invoke onChange handler when onChange event triggered', () => {
    var o = {};
    var change = function() {
      o = { value: 1 };
    }.bind(this);

    const component = renderIntoDocument(
      <AggregationSelect {...props} />
    );

    expect(o.value).to.equal(1);
  });
});
