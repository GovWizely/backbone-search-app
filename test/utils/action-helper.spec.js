import { expect } from 'chai';

import * as helpers from '../../src/js/utils/action-helper';

describe('action-helper', () => {
  describe('#formatAggregations', () => {
    const aggregations = {
      countries: [
        { key: 'Afghanistan', doc_count: 1 },
        { key: 'Aland Islands', doc_count: 1 },
        { key: 'Albania', doc_count: 1 }
      ],
      industries: [
        { key: '/Aerospace and Defense', doc_count: 1 },
        { key: '/Aerospace and Defense/Aviation', doc_count: 1 },
        { key: '/Aerospace and Defense/Aviation/Aircraft and Aircraft Parts', doc_count: 1 }
      ]
    };
    const formats = {
      countries: { type: 'array' },
      industries: { type: 'tree' }
    };

    it('should format aggregations successfully', () => {
      expect(helpers.formatAggregations(aggregations, formats)).to.eql({
        countries: {
          'Afghanistan': {},
          'Aland Islands': {},
          'Albania': {}
        },
        industries: {
          'Aerospace and Defense': {
            Aviation: {
              'Aircraft and Aircraft Parts': {}
            }
          }
        }
      });
    });
  });

  describe('#formatMetadata', () => {
    it('should format metadata successfully', () => {
    });
  });
});
