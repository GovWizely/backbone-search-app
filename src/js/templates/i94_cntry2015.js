import React from 'react';
import numeral from 'numeral';

import ResultTable from '../components/ResultTable';

const format = (value) => numeral(value).format();

const columns = {
  sa_report_code: { header: 'S&A Report Code' },
  i94_country_code: { header: 'I-94 Country Code' },
  country_of_residence: {
    header: `
      Country of Residence
      <br />
      (country of citizenship if residence is missing)`
  },
  jan: { header: 'Jan.', format },
  feb: { header: 'Feb.', format },
  mar: { header: 'Mar.', format },
  qt1: { header: '1Q15', format },
  apr: { header: 'Apr.', format },
  may: { header: 'May', format },
  jun: { header: 'Jun.', format },
  qt2: { header: '2Q15', format },
  jul: { header: 'Jul.', format },
  aug: { header: 'Aug.', format },
  sep: { header: 'Sep.', format },
  qt3: { header: '3Q15', format },
  oct: { header: 'Oct.', format },
  nov: { header: 'Nov.', format },
  dec: { header: 'Dec.', format },
  qt4: { header: '4Q15', format },
  total: { header: 'Total', format }
};

export const i94_cntry2015 = {
  View: ({ items }) => (
    <ResultTable css={ 'mi-i94-cntry2015' } columns={ columns } items={ items } />
  )
};
