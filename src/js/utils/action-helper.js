import { forEach, pick, reduce } from 'lodash';
import assign from 'object-assign';
import Url from 'url';
import { parseAsTree } from '../utils/aggregation-parser';

function reduceArray(array) {
  return reduce(
    array,
    (output, element) => assign({}, output, { [element.key]: {} }),
    {}
  );
}

export function formatAggregations(aggregations, formats) {
  if (!aggregations) return {};
  return reduce(formats, (output, format, key) => {
    const aggregation = aggregations[format.field || key];
    if (!aggregation) return output;

    switch (format.type) {
    case 'array':
      return assign({}, output, { [key]: reduceArray(aggregation) });
    case 'tree':
      return assign({}, output, { [key]: parseAsTree(aggregation) });
    default:
      throw new Error(`Invalidate format type: ${format.type} found in #formatAggregations`);
    }
  }, {});
}

export function formatMetadata(json, formats) {
  return reduce(
    formats,
    (output, format) => assign({}, output, { [format]: json[format] }),
    {}
  );
}

export function formatParams(query, permittedParams) {
  const params = pick(query, permittedParams);
  forEach(params, (value, key) => {
    if (Array.isArray(params[key])) params[key] = params[key].join(',');
  });
  return params;
}

export function formatEndpoint(endpoint, params) {
  const parsedEndpoint = Url.parse(endpoint, true);
  parsedEndpoint.query = assign({}, parsedEndpoint.query, params);
  parsedEndpoint.search = null;
  return Url.format(parsedEndpoint);
}

export const NO_ACTION = 'NO_ACTION';
export function noAction() {
  return {
    type: NO_ACTION
  };
}
