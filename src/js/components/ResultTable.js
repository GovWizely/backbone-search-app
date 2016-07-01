import { map } from 'lodash';
import React, { PropTypes } from 'react';

const THead = ({ headers }) => {
  const theads = map(headers, (header, index) => (
    <th key={ index } dangerouslySetInnerHTML={ { __html: header } }></th>
  ));

  return (
    <thead>
      <tr>{ theads }</tr>
    </thead>
  );
};
THead.propTypes = {
  headers: PropTypes.array.isRequired
};

const TBody = ({ columns, items }) => {
  const rows = map(items, (item, index) => (
    <Row key={ index } columns={ columns } item={ items[index] } />
  ));

  return (
    <tbody>{ rows }</tbody>
  );
};
TBody.propTypes = {
  columns: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

const Row = ({ columns, item }) => {
  const cells = map(columns, (column, key) => (
    <td key={ key }>{ column.format ? column.format(item[key]) : item[key] }</td>
  ));

  return (
    <tr>{ cells }</tr>
  );
};
Row.propTypes = {
  columns: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const ResultTable = ({ css = '', columns, items }) => (
  <table className={ `mi-result ${css}` }>
    <THead headers={ map(columns, 'header') } />
    <TBody columns={ columns } items={ items } />
  </table>
);

ResultTable.propTypes = {
  columns: PropTypes.object.isRequired,
  css: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default ResultTable;
