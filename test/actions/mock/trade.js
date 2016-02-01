import nock from 'nock';
import { format, parse } from 'url';
import r from '../../../src/js/resources/trade';

export function mockTradeEventsAPI() {
  const resource = r.trade_events;
  const { host, pathname, protocol, query } = parse(resource.endpoint, true);
  const response = require('../response/trade_event.json');

  nock(format({ host, protocol }))
    .get(pathname)
    .query(Object.assign({}, query, { q: '' }))
    .reply(200, response);
}

export function mockTradeLeadsAPI() {
  const resource = r.trade_leads;
  const { host, pathname, protocol, query } = parse(resource.endpoint, true);
  const response = require('../response/trade_lead.json');

  nock(format({ host, protocol }))
    .get(pathname)
    .query(Object.assign({}, query, { q: '' }))
    .reply(200, response);
}
