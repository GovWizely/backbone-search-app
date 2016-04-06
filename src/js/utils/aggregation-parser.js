import { map, reduce, set } from 'lodash';

export function parseAsTree(records) {
  return reduce(records, (output, record) => {
    const path = record.key.substring(1).replace(/\//g, '.');
    return set(output, path, {});
  }, {});
}

export function parse(records) {
  return map(records, (record) => {
    const array = record.key.substring(1).split('/');
    return { key: array[array.length - 1], doc_count: record.doc_count };
  });
}
