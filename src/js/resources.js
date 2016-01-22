import { fetchArticles } from './actions/article';
import { fetchTradeEvents, fetchTradeLeads } from './actions/trade';

const resources = {
  articles: {
    displayName: 'International Trade Administration',
    fetch: fetchArticles,
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      title: ['title'],
      url: ['url']
    },
    pathname: 'articles',
    stateKey: 'article',
    maxOffset: 1000
  },
  trade_events:  {
    displayName: 'Trade Event',
    fetch: fetchTradeEvents,
    fields: {
      key: ['id', 'event_name'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['event_name'],
      url: ['url', 'registration_link']
    },
    pathname: 'trade_events',
    stateKey: 'tradeEvent'
  },
  trade_leads: {
    displayName: 'Trade Lead',
    fetch: fetchTradeLeads,
    fields: {
      key: ['id', 'title', 'description'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['title', 'description'],
      url: ['url']
    },
    pathname: 'trade_leads',
    stateKey: 'tradeLead'
  }
};

export default resources;
