export const cards = ['trade_leads', 'trade_events'];

export const resources = {
  articles: {
    displayName: 'International Trade Administration',
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
