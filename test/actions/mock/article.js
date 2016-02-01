import nock from 'nock';
import { format, parse } from 'url';
import r from '../../../src/js/resources/article';

const resource = r.articles;
const { host, pathname, protocol } = parse(resource.endpoint);
const response = require(`../response/${resource.stateKey}.json`);

export function mockArticlesAPI() {
  nock(format({ host, protocol }))
    .get(pathname)
    .query({ q: '' })
    .reply(200, response);
}
