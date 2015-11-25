import {
  fetchArticles, fetchTradeEvents, fetchTradeLeads
} from './actions';

export default {
  articles: {
    fetch: fetchArticles,
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      title: ['title'],
      url: ['url']
    },
    displayName: 'Article',
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
    displayName: 'Trade Events',
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
    displayName: 'Trade Opportunities',
    pathname: 'trade_leads',
    stateKey: 'tradeLead'
  }
};
