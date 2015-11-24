import _ from 'lodash';

export function formatParams(query, whitelist) {
  let params = _.pick(query, whitelist);
  for (let key in params) {
    if (_.isArray(params[key])) params[key] = params[key].join(',');
  }
  return params;
}

export function formatFilterParams(query) {
  let params = Object.assign({}, query);
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
