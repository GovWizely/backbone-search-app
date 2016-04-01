import _ from 'lodash';
import assign from 'object-assign';
import Url from 'url';
import { parseAsTree } from '../utils/aggregation-parser';

function reduceArray(array) {
  return _.reduce(array, (output, element) => {
    output[element.key] = {};
    return output;
  }, {});
}

export function formatAggregations(aggregations, formats) {
  if (!aggregations) return {};
  let output = {};
  for (let key in formats) {
    let format = formats[key];
    let aggregation = aggregations[format.field || key];
    switch (format.type) {
      case 'array':
        output[key] = reduceArray(aggregation);
        break;
      case 'tree':
        output[key] = parseAsTree(aggregation);
        break;
      default:
        console.log(`Error: Invalid aggregations type ${format.type}.`);
    }
  }
  return output;
}

export function formatMetadata(json, formats) {
  let metadata = {};
  for (let field of formats) {
    metadata[field] = _.get(json, field);
  }
  return metadata;
}

export function formatParams(query, permittedParams) {
  let params = _.pick(query, permittedParams);
  for (let key in params) {
    if (_.isArray(params[key])) params[key] = params[key].join(',');
  }
  return params;
}

export function formatFilterParams(query) {
  let params = assign({}, query);
  const keys = Object.keys(query).map(k => k);
  keys.forEach(key => {
    let keyArray = key.split('-');
    if (keyArray[0] === 'filter') {
      let filter = keyArray.slice(1, keyArray.length);
      params[filter] = params[filter] || [];
      params[filter] = params[filter].concat(query[key]);
    }
  });
  return params;
}

export function formatEndpoint(endpoint, params) {
  let parsedEndpoint = Url.parse(endpoint, true);
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
