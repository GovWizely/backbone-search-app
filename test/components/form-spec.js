import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { createHistory } from 'history';
import { expect } from 'chai';
import Form from '../../src/js/components/form';

const { renderIntoDocument } = TestUtils;

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

  it('route to /search on submit event', () => {
    const component = renderIntoDocument(
      <Form expanded={ false } history={ createHistory() }/>
    );
    var e = { target: { value: 'keyword' } };
    component.handleKeywordChange(e);
    component.handleSubmit();
    expect(window.location.pathname).to.equal('/search');
  });
})
