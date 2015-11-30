import { expect } from 'chai';
import nock from 'nock';

import { mockStore } from '../test_helper';
import { NO_ACTION } from '../../src/js/utils/action-helper';
import * as actions from '../../src/js/actions/article';

describe('article', () => {
  describe('#fetchArticles', () => {
    const articles = [{ title: 'article #1' }, { title: 'article #2' }, { title: 'article #3' }];
    const countries = [
      { key: 'Algeria', doc_count: 1 },
      { key: 'Angola', doc_count: 1 }
    ];
    const industries = [
      { key: '/Aerospace and Defense', doc_count: 1 },
      { key: '/Aerospace and Defense/Aviation', doc_count: 1 },
      { key: '/Aerospace and Defense/Aviation/Aircraft and Aircraft Parts', doc_count: 1 }
    ];
    const topics = [
      { key: '/Business Management', doc_count: 1 },
      { key: '/Business Management/Enterprises', doc_count: 1 },
      { key: '/Business Management/Enterprises/Agents', doc_count: 1 }
    ];
    const response = {
      metadata: {}, results: articles, aggregations: { countries, industries, topics }
    };
    const parsedResponse = {
      metadata: {}, results: articles, aggregations: {
        countries: { 'Algeria': 'Algeria', 'Angola': 'Angola' },
        industries: { 'Aerospace and Defense': { 'Aviation': { 'Aircraft and Aircraft Parts': {} } } },
        topics: { 'Business Management': { 'Enterprises': { 'Agents': {} } } }
      }
    };

    beforeEach(() => {
      nock('https://pluto.kerits.org')
        .get('/v1/articles/search')
        .query(true)
        .reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    context('when query is empty', () => {
      let query = null;
      it('set query to { q: "" } before making request', done => {
        const expectedActions = [
          { type: actions.REQUEST_ARTICLES },
          { type: actions.RECEIVE_ARTICLES, response: parsedResponse }
        ];
        const state = {
          results: { article: { isFetching: false } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

    context('when articles.isFetching is false', () => {
      let query = { q: 'test ' };
      it('create an action to request articles', done => {
        const expectedActions = [
          { type: actions.REQUEST_ARTICLES },
          { type: actions.RECEIVE_ARTICLES, response: parsedResponse }
        ];
        const state = {
          results: { article: { isFetching: false } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

    context('when articles.isFetching is true', () => {
      let query = { q: 'test ' };
      it('prevent new request from being made', done => {
        const expectedActions = [{ type: NO_ACTION }];
        const state = {
          results: { article: { isFetching: true } }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

    context('when params contain filter-*', () => {
      let query = { q: 'test', 'filter-countries': 'Australia' };

      it('does not update article.aggregations', done => {
        const aggregations = {
          countries: { 'Algeria': 'Algeria' },
          industries: { 'Healthcare': 'Healthcare' }
        };
        const expectedActions = [
          { type: actions.REQUEST_ARTICLES },
          {
            type: actions.RECEIVE_ARTICLES,
            response: Object.assign({}, response, { aggregations })
          }
        ];
        const state = {
          results: {
            article: {
              isFetching: false, items: [], metadata: {},
              aggregations
            }
          }
        };
        const store = mockStore(state, expectedActions, done);
        store.dispatch(actions.fetchArticles(query));
      });
    });

  });
});
