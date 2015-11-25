import { expect } from 'chai';
import { mockStore } from '../test_helper';

import nock from 'nock';
import * as actions from '../../src/js/actions/aggregation';

describe('aggregation', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const aggregations = {
    countries: [],
    industries: [],
    topics: []
  };

  describe('fetchAggregations', function() {
    this.timeout(10000);

    it('create an action to request aggregations', (done) => {
      nock('https://pluto.kerits.org/')
        .get('/v1/articles/count')
        .reply(200, { aggregations });

      const expectedActions = [
        { type: actions.REQUEST_AGGREGATIONS },
        { type: actions.RECEIVE_AGGREGATIONS, aggregations }
      ];
      const store = mockStore({
        aggregations: { isFetching: false, data: {} }
      }, expectedActions, done);
      store.dispatch(actions.fetchAggregations());
    });
  });
});
