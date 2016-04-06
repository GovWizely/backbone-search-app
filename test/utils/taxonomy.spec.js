import { expect } from 'chai';
import { countryToAbbr } from '../../src/js/utils/taxonomy';

describe('taxonomy', () => {
  const names = 'Zambia,Zimbabwe,United States,United Kingdom';

  describe('#country', () => {
    it('return abbreviations of countries', () => {
      expect(countryToAbbr(names)).to.eql('ZM,ZW,US,GB');
    });
  });
});
