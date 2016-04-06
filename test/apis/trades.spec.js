import { expect } from 'chai';

import { default as tradeAPIs } from '../../src/js/apis/trades';

describe('apis/trades', () => {
  describe('ita_faqs', () => {
    const itaFAQs = tradeAPIs.ita_faqs;
    it('.aggregations should be defined', () => {
      expect(itaFAQs.aggregations).to.eql(
        { countries: { type: 'array' }, industries: { type: 'tree' } }
      );
    });

    it('.displayName should be defined', () => {
      expect(itaFAQs.displayName).to.eql('Frequently Asked Questions');
    });

    it('.metadata should be defined', () => {
      expect(itaFAQs.metadata).to.eql(
        ['total', 'offset', 'sources_used', 'search_performed_at']
      );
    });

    it('.shortName should be defined', () => {
      expect(itaFAQs.shortName).to.eql('FAQs');
    });

    it('#transformParams should be defined', () => {
      expect(itaFAQs.transformParams({
        q: 'test', countries: 'Australia,United Kingdom'
      })).to.eql({
        q: 'test', countries: 'AU,GB'
      });
    });

    it('#transformResponse should be defined', () => {
      expect(itaFAQs.transformResponse({
        aggregations: {
          countries: [{ key: 'AU' }, { key: 'GB' }],
          industries: [{ key: 'Agriculture' }]
        },
        results: [1, 2, 3]
      })).to.eql({
        aggregations: {
          countries: [{ key: 'Australia' }, { key: 'United Kingdom' }],
          industries: [{ key: 'Agriculture' }]
        },
        results: [1, 2, 3]
      });
    });
  });
});
