import nock from 'nock';
import { format, parse } from 'url';
import apis from '../../../src/js/apis';

export function mockTradeEventsAPI() {
  const api = apis.trade_events;
  const { host, pathname, protocol, query } = parse(api.endpoint, true);
  const response = require('../response/trade_event.json');

  nock(format({ host, protocol }))
    .get(pathname)
    .query(Object.assign({}, query, { q: '' }))
    .reply(200, response);
}

export function mockTradeLeadsAPI() {
  const api = apis.trade_leads;
  const { host, pathname, protocol, query } = parse(api.endpoint, true);
  const response = require('../response/trade_lead.json');

  nock(format({ host, protocol }))
    .get(pathname)
    .query(Object.assign({}, query, { q: '' }))
    .reply(200, response);
}
