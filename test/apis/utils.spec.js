import { expect } from 'chai';

import { defineAPI, resetUniqueIds } from '../../src/js/apis/utils';

describe('apis/utils', ()=> {
  describe('#defineAPI', () => {
    afterEach(() => {
      resetUniqueIds();
    });
    const endpoint = 'http://www.example.com';
    it('should create a new API object', () => {
      const api =  defineAPI('example', {
        endpoint: 'http://www.example.com'
      });
      expect(api).to.eql({
        example: {
          deckable: true,
          displayName: 'Example',
          endpoint,
          pathname: 'example',
          permittedParams: ['q'],
          uniqueId: 'example'
        }
      });
    });

    it('should create a new API object with overridden attributes', () => {
      const customAttributes = {
        deckable: false,
        displayName: 'Excellent',
        endpoint,
        pathname: 'excellent',
        permittedParams: ['o'],
        uniqueId: 'excellent'
      };
      const api = defineAPI('example', customAttributes);
      expect(api).to.eql({
        example: customAttributes
      });
    });

    it('should throw error when invalid attribute type is provided', () => {
      const fn = () => defineAPI('example', { aggregations: 1234 });
      expect(fn).to.throw(Error, /Invalid/);
    });

    it('should throw error when required attributes are missing', () => {
      const fn = () => defineAPI('example', {});
      expect(fn).to.throw(Error, /Required/);
    });

    it('should throw error when APIs with identical id is provided', () => {
      defineAPI('example', { endpoint });
      const fn = () => defineAPI('example', { endpoint });
      expect(fn).to.throw(Error, /Duplicated API found: /);
    });
  });
});
