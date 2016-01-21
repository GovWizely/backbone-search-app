import { fetchTradeEvents, fetchTradeLeads } from './actions/trade';
import { fetchConsolidatedResults } from './actions/consolidatedResult';

const resources = {
  articles: {
    fetch: fetchConsolidatedResults,
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      title: ['title'],
      url: ['url']
    },
    displayName: 'International Trade Administration',
    pathname: 'articles',
    stateKey: 'article',
    maxOffset: 1000
  },
  trade_events:  {
    fetch: fetchTradeEvents,
    fields: {
      key: ['id', 'event_name'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['event_name'],
      url: ['url', 'registration_link']
    },
    displayName: 'Trade Event',
    pathname: 'trade_events',
    stateKey: 'tradeEvent'
  },
  trade_leads: {
    fetch: fetchTradeLeads,
    fields: {
      key: ['id', 'title', 'description'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['title', 'description'],
      url: ['url']
    },
    displayName: 'Trade Lead',
    pathname: 'trade_leads',
    stateKey: 'tradeLead'
  }
};

export default resources;
