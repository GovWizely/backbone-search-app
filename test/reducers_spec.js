import { expect } from 'chai';

import reducer from '../src/js/reducers';
import initialState from '../src/js/initial-state';

import { REQUEST_FILTERS, RECEIVE_FILTERS } from '../src/js/actions/filter';
import { REQUEST_RESULTS, RECEIVE_RESULTS } from '../src/js/actions/result';
import { UPDATE_PATH } from 'redux-simple-router';

describe('reducer', () => {
  context('when action type is not recognizable', () => {
    it('should return current state', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      expect(reducer({}, action).results).to.eql(initialState.results);
    });
  });

  it('should handle REQUEST_RESULTS', () => {
    const action = { type: REQUEST_RESULTS, meta: 'article' };
    expect(reducer({}, action).results.article).to.eql({
      isFetching: true, items: [], metadata: {}, aggregations: {}
    });
  });

  it('should handle RECEIVE_RESULTS', () => {
    const results = [{ title: 'item #1' }, { title: 'item #2' }];
    const payload = { results , metadata: {}, aggregations: {} };
    const action = { type: RECEIVE_RESULTS, meta: 'article', payload };
    expect(reducer({}, action).results.article).to.eql({
      isFetching: false, items: results, metadata: {}, aggregations: {}
    });
  });

  it('should handle REQUEST_FILTERS', () => {
    const action = { type: REQUEST_FILTERS };
    expect(reducer({}, action).filters).to.eql({
      isFetching: true, items: {}
    });
  });

  it('should handle RECEIVE_FILTERS', () => {
    const payload = { countries: { 'Country #1': {}, 'Country #2': {} } };
    const action = { type: RECEIVE_FILTERS, payload };
    expect(reducer({}, action).filters).to.eql({
      isFetching: false, items: payload
    });
  });

  it('should handle UPDATE_PATH', () => {
    const action = { type: UPDATE_PATH, path: '/?test=1' };
    expect(reducer({}, action).query).to.eql({ test: '1' });
  });
});
