import { expect } from 'chai';

import { default as articleAPIs } from '../../src/js/apis/articles';

describe('apis/articles', () => {
  const articles = articleAPIs.articles;

  it('.aggregations should be defined', () => {
    expect(articles.aggregations).to.eql(
      { countries: { type: 'array' }, industries: { type: 'tree' } }
    );
  });

  it('.displayName should be defined', () => {
    expect(articles.displayName).to.eql('Market Intelligence');
  });

  it('.metadata should be undefined', () => {
    expect(articles.metadata).to.eql(undefined);
  });

  it('.permittedParams should be defined', () => {
    expect(articles.permittedParams).to.eql([
      'q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'
    ]);
  });

  it('.shortName should be undefined', () => {
    expect(articles.shortName).to.eql(undefined);
  });

  it('#transformParams should be defined', () => {
    expect(articles.transformParams({ q: 'test', offset: 1000 }))
      .to.eql({ q: 'test', offset: 0 });
    expect(articles.transformParams({ q: 'test', offset: -100 }))
      .to.eql({ q: 'test', offset: 0 });
    expect(articles.transformParams({ q: 'test', offset: 50 }))
      .to.eql({ q: 'test', offset: 50 });
  });
});
