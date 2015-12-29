import { expect } from 'chai';
import { mockStore } from '../test_helper';

import nock from 'nock';
import * as actions from '../../src/js/actions/trade';
import { NO_ACTION } from '../../src/js/utils/action-helper';

describe('trade', () => {
  describe('fetchTradeEvents', function() {
    const query = { q: 'test', countries: 'Albania,Algeria' };

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

    context('when tradeEvent.isFetching is true', () => {
      it('prevent new request from being made', done => {
        const expectedActions = [{ type: NO_ACTION }];
        const state = {
          results: { tradeEvent: { isFetching: true } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchTradeEvents(query));
      });
    });
  });

  describe('fetchTradeLeads', function() {
    const query = { q: 'test' };

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

    context('when tradeLead.isFetching is false', () => {
      const state = {
        results: {
          tradeLead: {
            isFetching: false,
            items: [],
            metadata: {}
          }
        }
      };

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


    context('when tradeLead.isFetching is true', () => {
      const state = {
        results: { tradeLead: { isFetching: true } }
      };

      it('prevent new request from being made', done => {
        const expectedActions = [{ type: NO_ACTION }];
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchTradeLeads(query));
      });
    });
  });

});
