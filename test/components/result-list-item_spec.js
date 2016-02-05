import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ResultListItem from '../../src/js/components/result-list-item';

function setup() {
  let props = {
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      title: ['title'],
      url: ['url']
    },
    item: {
      id: 1, snippet: 'Lorem Ipsum', title: 'Item #1', url: 'www.example.com'
    }
  };
  let renderer = TestUtils.createRenderer();
  renderer.render(<ResultListItem {...props} />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components/ResultListItem', () => {
  it('should render correctly', () => {
    let { output } = setup();

    expect(output.type).to.equal('article');
    expect(output.props.className).to.equal('mi-result-item');
  });
});
