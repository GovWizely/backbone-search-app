import { expect } from 'chai';
import { mockStore } from '../test_helper';

import nock from 'nock';
import * as actions from '../../src/js/actions/trade';

describe('trade', () => {
  const query = { q: 'test' };

  describe('fetchTradeEvents', function() {
    this.timeout(10000);

    const state = {
      results: {
        tradeEvent: { isFetching: false, items: [], metadata: {} }
      }
    };

    const response = {
      total: 3, offset: 0, sources_used: [],
      results: [{ id: '1', event_name: 'event #1', event_type: 'event type #1' }]
    };

    beforeEach(() => {
      nock('https://api.trade.gov/')
        .get('/trade_events/search')
        .query(true)
        .reply(200, response);
    });

    it('create an action to request trade events', done => {
      const expectedActions = [
        { type: actions.REQUEST_TRADES, resource: 'tradeEvent' },
        { type: actions.RECEIVE_TRADES,
          resource: 'tradeEvent',
          response: {
            metadata: {
              total: response.total,
              offset: response.offset,
              sources_used: response.sources_used
            },
            results: response.results
          }
        }
      ];
      const store = mockStore(state, expectedActions, done);
      store.dispatch(actions.fetchTradeEvents(query));
    });
  });

  describe('fetchTradeLeads', function() {
    this.timeout(10000);

    const state = {
      results: {
        tradeLead: {
          isFetching: false,
          items: [],
          metadata: {}
        }
      }
    };

    const response = {
      total: 3,
      offset: 0,
      sources_used: [],
      results: [
        { id: '1', title: 'trade lead #1' }
      ]
    };

    beforeEach(() => {
      nock('https://api.trade.gov/')
        .get('/trade_leads/search')
        .query(true)
        .reply(200, response);
    });

    it('create an action to request trade leads', done => {
      const expectedActions = [
        { type: actions.REQUEST_TRADES, resource: 'tradeLead' },
        { type: actions.RECEIVE_TRADES,
          resource: 'tradeLead',
          response: {
            metadata: {
              total: response.total,
              offset: response.offset,
              sources_used: response.sources_used
            },
            results: response.results
          }
        }
      ];
      const store = mockStore(state, expectedActions, done);
      store.dispatch(actions.fetchTradeLeads(query));
    });
  });

});
