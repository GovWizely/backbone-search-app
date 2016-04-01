import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';

const mockStore = configureMockStore([thunk]);

describe('actions/query', () => {
  it('should create an action to update query', () => {
    const payload = { q: 'example' };
    const expectedAction = { type: actions.UPDATE_QUERY, payload };
    expect(actions.updateQuery(payload)).to.eql(expectedAction);
  });

  it('should create an action to replace query', () => {
    const payload = { q: 'example' };
    const expectedAction = { type: actions.REPLACE_QUERY, payload };
    expect(actions.replaceQuery(payload)).to.eql(expectedAction);
  });

  describe('#clearFiltering', () => {
    it('should create an action to clear filtering query', () => {
      const store = mockStore({
        filtersByAggregation: { countries: {}, industries: {} },
        query: { q: 'test', countries: [1], industries: [1] }
      });
      const expectedActions = [{
        type: actions.REPLACE_QUERY,
        payload: { q: 'test' }
      }];

      store.dispatch(actions.clearFiltering());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  it('should create an action to update filtering query', () => {
    const store = mockStore({
      filtersByAggregation: { countries: {}, industries: {} },
      query: { countries: [] }
    });
    const expectedActions = [
      { type: actions.UPDATE_QUERY, payload: { countries: [1, 2, 3], offset: 0 } },
      { type: actions.INVALIDATE_FILTERS, meta: 'industries' }
    ];

    store.dispatch(actions.updateFiltering('countries', [1, 2, 3]));
    expect(store.getActions()).to.eql(expectedActions);
  });
});
