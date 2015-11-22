import {
  fetchArticles, fetchTradeEvents, fetchTradeLeads
} from './actions';

export default {
  articles: {
    fetch: fetchArticles,
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      source: ['type'],
      title: ['title'],
      url: ['url']
    },
    displayName: 'Article',
    pathName: 'articles',
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
    pathName: 'trade_events',
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
    pathName: 'trade_leads',
    stateKey: 'tradeLead'
  }
};
