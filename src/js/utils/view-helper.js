import _ from 'lodash';

export function findFirst(item, fields) {
  if (fields.length === 1) return item[fields[0]];

  return _.chain(item)
    .at(...fields)
    .omit(_.isUndefined)
    .omit(_.isNull)
    .toArray().value()[0];
}
