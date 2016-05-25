import { reduce, set } from 'lodash';

export function parseAsTree(records) {
  return reduce(records, (output, record) => {
    const path = record.key.substring(1).replace(/\//g, '.');
    return set(output, path, {});
  }, {});
}

export function parseAsArray(records) {
  const output = {};
  for (const { key } of records) {
    output[key] = {};
  }
  return output;
}
