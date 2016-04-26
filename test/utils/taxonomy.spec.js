import { expect } from 'chai';
import { abbrToCountry, countryToAbbr } from '../../src/js/utils/taxonomy';

describe('taxonomy', () => {
  describe('#countryToAbbr', () => {
    const names = 'Zambia,Zimbabwe,United States,United Kingdom';
    it('return abbreviations of countries', () => {
      expect(countryToAbbr(names)).to.eql('ZM,ZW,US,GB');
    });
  });

  describe('#abbrToCountry', () => {
    const abbrs = 'ZM,ZW,US,GB';
    it('return fullname of countries', () => {
      expect(abbrToCountry(abbrs)).to.eql('Zambia,Zimbabwe,United States,United Kingdom');
    });
  });
});
