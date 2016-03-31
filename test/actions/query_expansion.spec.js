import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';

const mockStore = configureMockStore([thunk]);

describe('actions/queryExpansion', () => {
  it('should create an action to invalidate query expansion', () => {
    const expectedAction = {
      type: actions.INVALIDATE_QUERY_EXPANSIONS
    };
    expect(actions.invalidateQueryExpansions()).to.eql(expectedAction);
  });

  describe('#fetchQueryExpansionsIfNeeded', () => {
    const endpoint = 'https://api.govwizely.com/ita_taxonomies/query_expansion';
    const apiKey = '0ooVzDG3pxt0azCL9uUBMYLS';
    const payload = { a: [1] };

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create an action to fetch query expansion if needed', (done) => {
      nock(endpoint)
        .get(`?api_key=${apiKey}&q=test`)
        .reply(200, { query_expansion: payload });

      const expectedActions  = [
        { type: actions.REQUEST_QUERY_EXPANSIONS },
        { type: actions.RECEIVE_QUERY_EXPANSIONS, payload }
      ];
      const store = mockStore({ queryExpansions: { invalidated: true }});
      store.dispatch(actions.fetchQueryExpansionsIfNeeded({ q: 'test' }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .then(done)
        .catch(done);
    });

    context('if no keyword is specified', (done) => {
      it('should return without dispatching any action', () => {
        const store = mockStore({ queryExpansions: { invalidated: true }});
        store.dispatch(actions.fetchQueryExpansionsIfNeeded({}))
          .then(() => {
            expect(store.getActions()).to.eql([]);
          })
          .then(done)
          .catch(done);
      });

    });
  });

});
