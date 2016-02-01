import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import resources from '../../src/js/resources';
import initialState from '../../src/js/initial-state';
import { REQUEST_FILTERS, RECEIVE_FILTERS } from '../../src/js/actions/filter';
import { fetchResults, REQUEST_RESULTS, RECEIVE_RESULTS } from '../../src/js/actions/result';
import { mockArticlesAPI } from './mock/article';
import { mockTradeEventsAPI, mockTradeLeadsAPI } from './mock/trade';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('result', () => {
  const payload = {
    article: require('./payload/article.json'),
    filter: require('./payload/filter.json'),
    trade_event: require('./payload/trade_event.json'),
    trade_lead: require('./payload/trade_lead.json'),
    consolidated_filter: require('./payload/consolidated_filter.json')
  };
  describe('#fetchResults', () => {
    context('when fetching a resource', () => {
      mockArticlesAPI();

      const resource = resources.articles;

      it('create RECEIVE_RESULTS & RECEIVE_FILTERS when fetch done', done => {
        const expectedActions = [
          { type: REQUEST_FILTERS },
          { type: REQUEST_RESULTS, meta: resource.stateKey },
          { type: RECEIVE_RESULTS, meta: resource.stateKey, payload: payload.article },
          { type: RECEIVE_FILTERS, payload: payload.filter }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(fetchResults({ q: '' }, resource));
      });
    });

    context('when fetching multiple resources', () => {
      mockArticlesAPI();
      mockTradeEventsAPI();
      mockTradeLeadsAPI();

      const multiResources = [resources.articles, resources.trade_events, resources.trade_leads];

      it('create RECEIVE_RESULTS & RECEIVE_FILTERS when fetches done', done => {
        const expectedActions = [
          { type: REQUEST_FILTERS },
          { type: REQUEST_RESULTS, meta: multiResources[0].stateKey },
          { type: REQUEST_RESULTS, meta: multiResources[1].stateKey },
          { type: REQUEST_RESULTS, meta: multiResources[2].stateKey },
          { type: RECEIVE_RESULTS, meta: multiResources[0].stateKey, payload: payload.article },
          { type: RECEIVE_RESULTS, meta: multiResources[1].stateKey, payload: payload.trade_event },
          { type: RECEIVE_RESULTS, meta: multiResources[2].stateKey, payload: payload.trade_lead },
          { type: RECEIVE_FILTERS, payload: payload.consolidated_filter }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(fetchResults({ q: '' }, multiResources));
      });
    });
  });
});
