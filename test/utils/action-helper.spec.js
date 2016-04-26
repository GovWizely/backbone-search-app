import assign from 'object-assign';
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
      const format = ['total', 'offset'];
      const json = { total: 100, offset: 10, results: [1, 2, 3] };
      expect(helpers.formatMetadata(json, format)).to.eql({
        total: 100, offset: 10
      });
    });
  });

  describe('#formatParams', () => {
    it('should format params successfully', () => {
      const permittedParams = ['q', 'countries'];
      const params = { q: 'test', countries: [1, 2, 3, 4] };
      expect(helpers.formatParams(params, permittedParams)).to.eql({
        q: 'test', countries: '1,2,3,4'
      });
    });
  });

  describe('#formatEndpoint', () => {
    it('should format endpoint successfully', () => {
      const endpoint = 'http://www.example.com';
      const params = { q: 'test', countries: [1, 2, 3, 4] };
      expect(helpers.formatEndpoint(endpoint, params)).to.eql(
        'http://www.example.com/?q=test&countries=1&countries=2&countries=3&countries=4'
      );
    });
  });

  describe('#permitParams', () => {
    it('should remove unpermitted params successfully', () => {
      const permittedParams = ['q', 'countries'];
      const params = { q: 'test', countries: [1, 2, 3, 4], invalid: 'test' };
      expect(helpers.permitParams(params, permittedParams)).to.eql({
        q: 'test', countries: [1, 2, 3, 4]
      });
    });
  });

});
