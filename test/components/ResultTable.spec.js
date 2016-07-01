import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ResultTable from '../../src/js/components/ResultTable';

function setup(columns = {}, items = []) {
  const props = { columns, items };
  const renderer = TestUtils.createRenderer();
  renderer.render(<ResultTable { ...props } />);
  const output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components/ResultTable', () => {
  const columns = {
    id: { header: 'ID' },
    money: { header: 'Deposit', format: (value) => `$ ${value}` }
  };
  const items = [
    { id: 1, money: 100 },
    { id: 2, money: 200 },
    { id: 3, money: 300 }
  ];

  const { output } = setup(columns, items);
  it('should render correctly', () => {
    expect(output.type).to.equal('table');
  });
});
