jest.dontMock('../country-select');
jest.dontMock('../../stores/country-store');

var React     = require('react');
var ReactDOM  = require('react-dom');
var TestUtils = require('react-addons-test-utils');

const CountrySelect = require('../country-select');

describe('CountrySelect', function() {
  var select, selectNode;

  beforeEach(function() {
    select = TestUtils.renderIntoDocument(
      <CountrySelect />
    );
    selectNode = ReactDOM.findDOMNode(select);
  });

  it('populate options on mount', function() {
    console.log(selectNode.firstChild);
  });
});
