import { expect } from 'chai';
import { mockStore } from '../test_helper';

import nock from 'nock';
import * as actions from '../../src/js/actions/article';

describe('article', () => {


  const state = {
    results: {
      article: { isFetching: false, items: [], metadata: {}, aggregations: {} }
    }
  };

  const articles = [
    { title: 'article #1' },
    { title: 'article #2' },
    { title: 'article #3' }
  ];

  const response = {
    metadata: {},
    results: articles,
    aggregations: {
      countries: {},
      industries: {},
      topics: {}
    }
  };

  const query = {
    q: 'test',
    countries: 'Albania,Australia',
    industries: 'Aviation,Healthcare',
    topics: 'Finance,Bank',
    offset: 10
  };

  describe('fetchArticles', function() {
    this.timeout(10000);

    beforeEach(() => {
      nock('https://pluto.kerits.org')
        .get('/v1/articles/search')
        .query(query)
        .reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('create an action to request articles', (done) => {
      const expectedActions = [
        { type: actions.REQUEST_ARTICLES },
        { type: actions.RECEIVE_ARTICLES, response }
      ];
      const store = mockStore(state, expectedActions, done);
      store.dispatch(actions.fetchArticles(query));
    });
  });
});
