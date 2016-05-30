import { expect } from 'chai';
import reducer from '../src/js/reducers';
import * as actions from '../src/js/actions';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      apis: {},
      filtersByAggregation: {},
      form: {},
      notifications: [],
      query: { q: '' },
      resultsByAPI: {},
      routing: {
        changeId: 1,
        path: 'blank'
      },
      selectedAPIs: [],
      window: {}
    });
  });

  describe('.filtersByAggregation', () => {
    it('should handle REQUEST_FILTERS', () => {
      expect(reducer(undefined, {
        type: actions.REQUEST_FILTERS,
        meta: 'countries'
      }).filtersByAggregation).to.eql({
        countries: {
          invalidated: false,
          items: {}
        }
      });
    });

    it('should handle RECEIVE_FILTERS', () => {
      expect(reducer(undefined, {
        type: actions.RECEIVE_FILTERS,
        meta: 'countries',
        payload: { a: {}, b: {}, c: {} }
      }).filtersByAggregation).to.eql({
        countries: {
          invalidated: false,
          items: { a: {}, b: {}, c: {} }
        }
      });
    });

    it('should handle INVALIDATE_FILTERS', () => {
      expect(reducer(undefined, {
        type: actions.INVALIDATE_FILTERS,
        meta: 'countries'
      }).filtersByAggregation).to.eql({
        countries: {
          invalidated: true,
          items: {}
        }
      });
    });
  });

  it('should handle ADD_NOTIFICATION', () => {
    expect(reducer(undefined, {
      type: actions.ADD_NOTIFICATION,
      payload: { text: 'message', type: 'error' }
    }).notifications).to.eql([
      { text: 'message', type: 'error' }
    ]);
  });

  const queryState = { q: '', countries: [1, 2, 3], industries: [1, 2, 3] };
  it('should handle UPDATE_QUERY', () => {
    expect(reducer({ query: queryState }, {
      type: actions.UPDATE_QUERY,
      payload: { q: 'test' }
    }).query).to.eql({ countries: [1, 2, 3], industries: [1, 2, 3], q: 'test' });
  });

  it('should handle REPLACE_QUERY', () => {
    expect(reducer({ query: queryState }, {
      type: actions.REPLACE_QUERY,
      payload: { q: 'test' }
    }).query).to.eql({ q: 'test' });
  });

  it('should handle REQUEST_RESULTS', () => {
    expect(reducer(undefined, {
      type: actions.REQUEST_RESULTS,
      meta: 'articles'
    }).resultsByAPI).to.eql({
      articles: {
        aggregations: {},
        invalidated: false,
        isFetching: true,
        items: [],
        metadata: {}
      }
    });
  });

  it('should handle RECEIVE_RESULTS', () => {
    expect(reducer(undefined, {
      type: actions.RECEIVE_RESULTS,
      meta: 'articles',
      payload: {
        results: [1, 2, 3],
        metadata: { a: {}, b: {}, c: {} },
        aggregations: { a: {}, b: {}, c: {} }
      }
    }).resultsByAPI).to.eql({
      articles: {
        aggregations: { a: {}, b: {}, c: {} },
        invalidated: false,
        isFetching: false,
        items: [1, 2, 3],
        metadata: { a: {}, b: {}, c: {} }
      }
    });
  });

  it('should handle SELECT_APIS', () => {
    const payload = ['uniqueId'];
    expect(reducer(undefined, {
      type: actions.SELECT_APIS, payload
    }).selectedAPIs).to.eql(payload);
  });

  it('should handle UPDATE_WINDOW', () => {
    const payload = { innerWidth: 1000, innerHeight: 1000 };
    expect(reducer(undefined, {
      type: actions.UPDATE_WINDOW, payload
    }).window).to.eql(payload);
  });
});
