import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import resources from '../../src/js/resources';
import initialState from '../../src/js/initial-state';
import { REQUEST_FILTERS, RECEIVE_FILTERS } from '../../src/js/actions/filter';
import { fetchResults, REQUEST_RESULTS, RECEIVE_RESULTS } from '../../src/js/actions/result';
import { mockArticlesAPI } from './mocks/article';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('result', () => {
  const articlePayload = require('./mocks/article.payload.js').default;
  const filterPayload = require('./mocks/filter.payload.js').default;

  describe('#fetchResults', () => {
    context('when fetching results of a single resource', () => {
      const resource = resources.articles;
      it('create RECEIVE_RESULTS & RECEIVE_FILTERS when fetch done', done => {
        mockArticlesAPI();
        const expectedActions = [
          { type: REQUEST_FILTERS },
          { type: REQUEST_RESULTS, meta: resource.stateKey },
          { type: RECEIVE_RESULTS, meta: resource.stateKey, payload: articlePayload },
          { type: RECEIVE_FILTERS, payload: filterPayload }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(fetchResults({ q: '' }, resource));
      });

    });

    context('when fetching results of multiple resources', () => {
      nock('https://api.trade.gov')
        .get('/trade_leads/search')
        .query({ api_key: 'hSLqwdFz1U25N3ZrWpLB-Ld4', q: '' })
        .reply(200, { offset: 0, total: 100, results: [] });

      const multiResources = [resources.articles, resources.trade_events, resources.trade_leads];

      xit('create RECEIVE_RESULTS & RECEIVE_FILTERS when fetches done', done => {

      });
    });
  });
});
