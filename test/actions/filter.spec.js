import assign from 'object-assign';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';

const mockStore = configureMockStore([thunk]);
const state = {
  filtersByAggregation: {
    countries: {},
    industries: {}
  },
  resultsByAPI: {
    a: {
      aggregations: {
        countries: { a: {}, b: {}, c: {} },
        industries: { x: {}, y: {}, z: {} }
      }
    },
    b: {
      aggregations: {
        countries: { b: {}, c: {}, d: {} },
        industries: { w: {}, x: {}, y: {} }
      }
    },
    c: {
      aggregations: {
        countries: { c: {}, d: {}, e: {} },
        industries: { v: {}, w: {}, x: {} }
      }
    }
  },
  selectedAPIs: [
    { uniqueId: 'a' }, { uniqueId: 'b' }, { uniqueId: 'c' }
  ]
};

const aggregation = 'countries';
const payload = { };

describe('actions/filter', () => {
  it('should create an action to request filters', () => {
    const expectedAction = {
      type: actions.REQUEST_FILTERS,
      meta: aggregation
    };
    expect(actions.requestFilters(aggregation)).to.eql(expectedAction);
  });

  it('should create an action to receive filters', () => {
    const expectedAction = {
      type: actions.RECEIVE_FILTERS,
      meta: aggregation,
      payload
    };
    expect(actions.receiveFilters(aggregation, payload)).to.eql(expectedAction);
  });

  it('should create an action to invalidate filters', () => {
    const expectedAction = {
      type: actions.INVALIDATE_FILTERS,
      meta: aggregation
    };
    expect(actions.invalidateFilters(aggregation)).to.eql(expectedAction);
  });

  describe('#invalidateAllFilters', () => {
    it('should create multiple actions to invalidate all filters', () => {
      const expectedActions = [
        { type: actions.INVALIDATE_FILTERS, meta: 'countries' },
        { type: actions.INVALIDATE_FILTERS, meta: 'industries' }
      ];
      const store = mockStore(state);
      store.dispatch(actions.invalidateAllFilters());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('#invalidateSiblingFilters', () => {
    it('should create multiple actions to invalidate all but the specified filter', () => {
      const expectedActions = [
        { type: actions.INVALIDATE_FILTERS, meta: 'industries' }
      ];
      const store = mockStore(state);
      store.dispatch(actions.invalidateSiblingFilters('countries'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('#computeFiltersByAggregation', () => {
    it('should create multiple RECEIVE_FILTERS', () => {
      const store = mockStore(state);
      const expectedActions = [
        { type: actions.REQUEST_FILTERS, meta: 'countries' },
        { type: actions.RECEIVE_FILTERS, meta: 'countries',
          payload: { a: {}, b: {}, c: {}, d: {}, e: {} } },
        { type: actions.REQUEST_FILTERS, meta: 'industries' },
        { type: actions.RECEIVE_FILTERS, meta: 'industries',
          payload: { v: {}, w: {}, x: {}, y: {}, z: {} } }
      ];
      store.dispatch(actions.computeFiltersByAggregation());
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not create REQUEST_FILTERS if not needed ', () => {
      const store = mockStore(assign({}, state, {
        filtersByAggregation: {
          countries: {
            invalidated: false,
            items: { a: {} }
          },
          industries: {
            invalidated: true,
            items: { z: {} }
          }
        }
      }));
      const expectedActions = [
        { type: actions.REQUEST_FILTERS, meta: 'industries' },
        { type: actions.RECEIVE_FILTERS, meta: 'industries',
          payload: { v: {}, w: {}, x: {}, y: {}, z: {} } }
      ];
      store.dispatch(actions.computeFiltersByAggregation());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
