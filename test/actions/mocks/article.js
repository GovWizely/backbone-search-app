import nock from 'nock';
import { format, parse } from 'url';
import article from '../../../src/js/resources/article';

const resource = article.articles;
const { host, pathname, protocol } = parse(resource.endpoint);
const response = require('./article.response.json');

export function mockArticlesAPI() {
  nock(format({ host, protocol }))
    .get(pathname)
    .query({ q: '' })
    .reply(200, response);
}
