import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ArticleList from '../../src/js/components/article-list';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = TestUtils;

describe('ArticleList', () => {
  it('renders a list of articles', () => {
    var articles = [
      { id: 1, url: 'http://www.example.com', title: 'article#1', snippet: 'Lorem Ipsum' },
      { id: 2, url: 'http://www.example.com', title: 'article#2', snippet: 'Lorem Ipsum' },
      { id: 3, url: 'http://www.example.com', title: 'article#3', snippet: 'Lorem Ipsum' }
    ];
    const component = renderIntoDocument(
      <ArticleList articles={ articles }/>
    );

    const articlesDOM = scryRenderedDOMComponentsWithTag(component, 'article');
    expect(articlesDOM.length).to.equal(3);
  });
});
