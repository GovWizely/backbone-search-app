import assign from 'object-assign';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Pagination from '../../src/js/components/pagination';

function setup(prop={}) {
  let props = assign({}, {
    items: 99,
    itemsOnPage: 10,
    query: { q: 'test' },
    url: 'www.example.com'
  }, prop);
  let renderer = TestUtils.createRenderer();
  renderer.render(<Pagination {...props} />);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('components/Pagination', () => {
  const firstButton = 'mi-icon mi-icon-angle-double-left',
        prevButton = 'mi-icon mi-icon-angle-left',
        nextButton = 'mi-icon mi-icon-angle-right',
        lastButton = 'mi-icon mi-icon-angle-double-right';

  context('when items: 99, itemsOnPage: 10', () => {
    it('should render 10 pages', () => {
      const { output } = setup();
      const buttons = output.props.children.props.children;
      expect(buttons[2].length).to.equal(10);
    });

    context('when currentOffset is 0', () => {
      const { output } = setup({ offset: 0 });
      const buttons = output.props.children.props.children;

      it('should not render first page & previous button', () => {
        expect(buttons[0]).to.be.null;
        expect(buttons[1]).to.be.null;
      });
      it('should render next page & last page button', () => {
        expect(buttons[3].props.children.props.className).to.equal(nextButton);
        expect(buttons[4].props.children.props.className).to.equal(lastButton);
      });
    });

    context('when currentOffset is 10', () => {
      const { output } = setup({ currentOffset: 11 });
      const buttons = output.props.children.props.children;

      it('should render first page & previous page button', () => {
        expect(buttons[0].props.children.props.className).to.equal(firstButton);
        expect(buttons[1].props.children.props.className).to.equal(prevButton);
      });
      it('should render next page & last page button', () => {
        expect(buttons[3].props.children.props.className).to.equal(nextButton);
        expect(buttons[4].props.children.props.className).to.equal(lastButton);
      });
    });

    context('when currentOffset is 90', () => {
      const { output } = setup({ currentOffset: 90 });
      const buttons = output.props.children.props.children;

      it('should render first page * previous page button', () => {
        expect(buttons[0].props.children.props.className).to.equal(firstButton);
        expect(buttons[1].props.children.props.className).to.equal(prevButton);
      });
      it('should not render next page * last page button', () => {
        expect(buttons[3]).to.be.null;
        expect(buttons[4]).to.be.null;
      });
    });
  });

  context('when items less than itemsOnPage', () => {
    const { output } = setup({ items: 7, itemsOnPage: 10 });

    it('should not render pagination', () => {
      expect(output).to.be.null;
    });
  });

});
