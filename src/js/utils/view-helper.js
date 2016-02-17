import _ from 'lodash';

export function findFirst(item, fields) {
  if (_.isEmpty(fields)) return null;
  if (fields.length === 1) return item[fields[0]];

  return _.chain(item)
    .at(...fields)
    .omitBy(_.isUndefined)
    .omitBy(_.isNull)
    .toArray().value()[0];
}

export function formatResult(result, fields) {
  return {
    key: findFirst(result, fields.key),
    snippet: findFirst(result, fields.snippet),
    source: findFirst(result, fields.source),
    title: findFirst(result, fields.title),
    url: findFirst(result, fields.url)
  };
}

export function createResultFormatter(fields) {
  return results => formatResult(results, fields);
}
