import { expect } from 'chai';

import reducer from '../src/js/reducers';

import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from '../src/js/actions/aggregation';
import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from '../src/js/actions/article';
import { REQUEST_TRADES, RECEIVE_TRADES } from '../src/js/actions/trade';
import { UPDATE_PATH } from 'redux-simple-router';
describe('reducer', () => {
  const initialState = {
    aggregations: {
      isFetching: false,
      data: {}
    },
    results: {
      article: {
        isFetching: false,
        items: [],
        metadata: {},
        aggregations: {}
      },
      tradeEvent: {
        isFetching: false,
        items: [],
        metadata: {}
      },
      tradeLead: {
        isFetching: false,
        items: [],
        metadata: {}
      }
    },
    query: {}
  };

  describe('when action type is not recognizable', () => {
    it('should return current state', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      expect(reducer({}, action).results).to.eql(initialState.results);
    });
  });

  it('should return the initial aggregations state', () => {
    expect(reducer(undefined, {}).aggregations).to.eql({
      isFetching: false, data: {}
    });
  });

  it('should handle REQUEST_AGGREGATIONS', () => {
    const action = { type: REQUEST_AGGREGATIONS };
    expect(reducer({}, action).aggregations).to.eql({
      isFetching: true, data: {}
    });
  });

  it('should handle RECEIVE_AGGREGATIONS', () => {
    const response = { countries: [], industries: [], topics: [] };
    const action = { type: RECEIVE_AGGREGATIONS, response };
    expect(reducer({}, action).aggregations).to.eql({
      data: response, isFetching: false
    });
  });

  it('should handle REQUEST_ARTICLES', () => {
    const action = { type: REQUEST_ARTICLES };
    expect(reducer({}, action).results.article).to.eql({
      isFetching: true, items: [], metadata: {}, aggregations: {}
    });
  });

  it('should handle RECEIVE_ARTICLES', () => {
    const results = [{ title: 'item #1' }, { title: 'item #2' }];
    const response = { results , metadata: {}, aggregations: {} };
    const action = { type: RECEIVE_ARTICLES, response };
    expect(reducer({}, action).results.article).to.eql({
      isFetching: false, items: results, metadata: {}, aggregations: {}
    });
  });

  it('should handle REQUEST_TRADES for tradeEvent', () => {
    const action = { type: REQUEST_TRADES, resource: 'tradeEvent' };
    expect(reducer({}, action).results.tradeEvent).to.eql({
      isFetching: true, items: [], metadata: {}
    });
  });

  it('should handle RECEIVE_TRADES for tradeEvent ', () => {
    const results = [{ title: 'item #1' }, { title: 'item #2' }];
    const response = { results, metadata: {} };
    const action = { type: RECEIVE_TRADES, resource: 'tradeEvent', response };
    expect(reducer({}, action).results.tradeEvent).to.eql({
      isFetching: false, items: results, metadata: {}
    });
  });

  it('should handle REQUEST_TRADES for tradeLead', () => {
    const action = { type: REQUEST_TRADES, resource: 'tradeLead' };
    expect(reducer({}, action).results.tradeLead).to.eql({
      isFetching: true, items: [], metadata: {}
    });
  });

  it('should handle RECEIVE_TRADES for tradeLead ', () => {
    const results = [{ title: 'item #1' }, { title: 'item #2' }];
    const response = { results, metadata: {} };
    const action = { type: RECEIVE_TRADES, resource: 'tradeLead', response };
    expect(reducer({}, action).results.tradeLead).to.eql({
      isFetching: false, items: results, metadata: {}
    });
  });

  it('should handle UPDATE_PATH', () => {
    const action = { type: UPDATE_PATH, path: '/?test=1' };
    expect(reducer({}, action).query).to.eql({ test: '1' });
  });

});
