import { expect } from 'chai';
import nock from 'nock';

import { mockStore } from '../test_helper';
import { NO_ACTION } from '../../src/js/utils/action-helper';
import * as actions from '../../src/js/actions/article';

describe('article', () => {
  const articles = [{ title: 'article #1' }, { title: 'article #2' }, { title: 'article #3' }];

  describe('#fetchArticles', () => {
    let query, response;

    beforeEach(() => {
      nock('https://pluto.kerits.org')
        .get('/v1/articles/search')
        .query(query)
        .reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    context('when articles.isFetching is false', () => {
      query = { q: 'test' };
      response = {
        metadata: {}, results: articles, aggregations: {
          countries: {}, industries: {}, topics: {}
        }
      };

      it('create an action to request articles', done => {
        const expectedActions = [
          { type: actions.REQUEST_ARTICLES },
          { type: actions.RECEIVE_ARTICLES, response }
        ];
        const state = {
          results: { article: { isFetching: false, items: [], metadata: {}, aggregations: {} } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

    context('when articles.isFetching is true', () => {
      it('prevent new request from being made', done => {
        const expectedActions = [{ type: NO_ACTION }];
        const state = {
          results: { article: { isFetching: true } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

  });
});
