import { expect } from 'chai';

import { parse, parseAsTree } from '../../src/js/utils/aggregation-parser';

describe('aggregation-parser', () => {
  const records = [
    { key: '/Aerospace and Defense', doc_count: 1 },
    { key: '/Aerospace and Defense/Aviation', doc_count: 1 },
    { key: '/Aerospace and Defense/Aviation/Aircraft and Aircraft Parts', doc_count: 1 }
  ];

  describe('#parse', () => {
    it('split by "/" and return the last element as key', () => {
      expect(parse(records)).to.eql([
        { key: 'Aerospace and Defense', doc_count: 1 },
        { key: 'Aviation', doc_count: 1 },
        { key: 'Aircraft and Aircraft Parts', doc_count: 1 }
      ]);
    });
  });

  describe('#parseAsTree', () => {
    it('split by "/" and return structure all elements as a tree', () => {
      expect(parseAsTree(records)).to.eql({
        'Aerospace and Defense': {
          Aviation: {
            'Aircraft and Aircraft Parts': {}
          }
        }
      });
    });
  });
});
