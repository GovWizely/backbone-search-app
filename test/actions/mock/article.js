import nock from 'nock';
import { format, parse } from 'url';
import apis from '../../../src/js/apis';

const api = apis.articles;
const { host, pathname, protocol } = parse(api.endpoint);
const response = require(`../response/${api.uniqueId}.json`);

export function mockArticlesAPI() {
  nock(format({ host, protocol }))
    .get(pathname)
    .query({ q: '' })
    .reply(200, response);
}
