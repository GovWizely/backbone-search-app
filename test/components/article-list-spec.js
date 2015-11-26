import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ResultList from '../../src/js/components/result-list';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = TestUtils;

describe('ResultList', () => {
  it.skip('renders a list of items', () => {
    var items = [
      { id: 1, url: 'http://www.example.com', title: 'article#1', snippet: 'Lorem Ipsum' },
      { id: 2, url: 'http://www.example.com', title: 'article#2', snippet: 'Lorem Ipsum' },
      { id: 3, url: 'http://www.example.com', title: 'article#3', snippet: 'Lorem Ipsum' }
    ];
    const component = renderIntoDocument(
      <ResultList items={ items }/>
    );

    const resultsDOM = scryRenderedDOMComponentsWithTag(component, 'article');
    expect(resultsDOM.length).to.equal(3);
  });
});
