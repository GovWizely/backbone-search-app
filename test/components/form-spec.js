import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Form from '../../src/js/components/form';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

describe('Form', () => {
  it('render ExpandedForm by default', () => {
    const component = renderIntoDocument(
      <Form />
    );
    var form = component.view();
    expect(form.type.displayName).to.equal('ExpandedForm');
  });

  it('render CondensedForm when expanded property is false', () => {
    const component = renderIntoDocument(
      <Form expanded={ false }/>
    );
    var form = component.view();
    expect(form.type.displayName).to.equal('CondensedForm');
  });
})
