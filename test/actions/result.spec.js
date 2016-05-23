import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';
import { allAPIs as apis } from '../../src/js/apis';

const api = apis.articles;
const payload = {
  aggregations: {
    countries: {},
    industries: {}
  },
  metadata: {},
  results: [1, 2, 3]
};
const mockStore = configureMockStore([thunk]);
const state = {
  filtersByAggregation: {},
  query: { q: 1 },
  resultsByAPI: {},
  selectedAPIs: [api]
};

describe('actions/result', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action to request results', () => {
    const expectedAction = {
      type: actions.REQUEST_RESULTS,
      meta: api.uniqueId
    };
    expect(actions.requestResults(api.uniqueId)).to.eql(expectedAction);
  });


  it('should create an action to receive results', () => {
    const expectedAction = {
      type: actions.RECEIVE_RESULTS,
      meta: api.uniqueId,
      payload
    };
    expect(actions.receiveResults(api.uniqueId, payload)).to.eql(expectedAction);
  });

  it('should create an action to indicate failure when requesting results', () => {
    const expectedAction = {
      type: actions.FAILURE_RESULTS,
      error: true,
      meta: api.uniqueId,
      payload
    };
    expect(actions.failureResults(api.uniqueId, payload)).to.eql(expectedAction);
  });

  it('create RECEIVE_RESULTS when results have been received', (done) => {
    nock(api.endpoint)
      .get('?q=1')
      .reply(200, payload);

    const expectedActions = [
      { type: actions.REQUEST_RESULTS, meta: api.uniqueId },
      { type: actions.RECEIVE_RESULTS, meta: api.uniqueId, payload }
    ];
    const store = mockStore(state);

    store.dispatch(actions.fetchResultsByAPI())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .then(done)
      .catch(done);
  });
});
