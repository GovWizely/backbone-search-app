import { expect } from 'chai';
import { mockStore } from '../test_helper';

import nock from 'nock';
import * as actions from '../../src/js/actions/aggregation';

describe('aggregation', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const response = {
    countries: [],
    industries: [],
    topics: []
  };

  describe('fetchAggregations', () => {
    it('create an action to request aggregations', done => {
      nock('https://pluto.kerits.org/')
        .get('/v1/articles/count')
        .reply(200, { aggregations: response });

      const expectedActions = [
        { type: actions.REQUEST_AGGREGATIONS },
        { type: actions.RECEIVE_AGGREGATIONS, response }
      ];
      const store = mockStore({
        aggregations: { isFetching: false, data: {} }
      }, expectedActions, done);
      store.dispatch(actions.fetchAggregations());
    });

    context('when isFetching is already true', () => {
      it('exits to prevent new request from being made', done => {
        const store = mockStore({
          aggregations: { isFetching: true, data: {} }
        }, [], done);
        store.dispatch(actions.fetchAggregations());
        done();
      });
    });
  });
});
