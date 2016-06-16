import assign from 'object-assign';
import invariant from 'invariant';
import { compact, isEmpty, map } from 'lodash';

const implicit = {
  query_expansion: true
};

export const allAPIs = assign(
  {},
  require('./articles'),
  require('./trades')
);

export function enableAPIs(apis = { articles: true, query_expansion: true }) {
  invariant(!isEmpty(apis), 'No API is specified');

  return compact(map(assign({}, implicit, apis), (option, uniqueId) => {
    invariant(allAPIs[uniqueId], `Invalid API "${uniqueId}"`);
    if (!option) return null;

    return assign({}, allAPIs[uniqueId], option);
  }));
}
