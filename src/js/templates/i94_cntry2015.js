import { map } from 'lodash';
import React from 'react';

const labels = {
  sa_report_code: 'S&A Report Code',
  i94_country_code: 'I-94 Country Code',
  country_of_residence: `
    Country of Residence
    <br />
    (country of citizenship if residence is missing)`,
  jan: 'Jan.',
  feb: 'Feb.',
  mar: 'Mar.',
  qt1: '1Q15',
  apr: 'Apr.',
  may: 'May',
  jun: 'Jun.',
  qt2: '2Q15',
  jul: 'Jul.',
  aug: 'Aug.',
  sep: 'Sep.',
  qt3: '3Q15',
  oct: 'Oct.',
  nov: 'Nov.',
  dec: 'Dec.',
  qt4: '4Q15',
  total: 'Total'
};

const THead = ({ headers }) => {
  const ths = map(headers, (label, key) => (
    <th key={ key } dangerouslySetInnerHTML={ { __html: label } }></th>
  ));

  return (
    <thead>
      <tr>{ ths }</tr>
    </thead>
  );
};

const TBody = ({ columns, data }) => {
  const rows = map(data, (item, index) => (
    <Row key={ index } columns={ columns } rowData={ data[index] } />
  ));

  return (
    <tbody>{ rows }</tbody>
  );
};

const Row = ({ columns, rowData }) => {
  const cells = map(columns, (_, key) => (
    <td key={ key }>{ rowData[key] }</td>
  ));

  return (
    <tr>{ cells }</tr>
  );
};

export const i94_cntry2015 = {
  View: ({ items }) => (
    <table className="mi-result mi-i94-cntry2015">
      <THead headers={ labels } />
      <TBody columns={ labels } data={ items } />
    </table>
  )
};
