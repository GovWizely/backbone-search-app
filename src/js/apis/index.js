import assign from 'object-assign';
import invariant from 'invariant';
import { isEmpty, reduce } from 'lodash';

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

  return reduce(assign({}, implicit, apis), (output, option, uniqueId) => {
    invariant(allAPIs[uniqueId], `Invalid API "${uniqueId}"`);
    if (option === false) return output;

    const config = option === true ? { deckable: true } : assign({}, option);
    return assign({}, output, { [uniqueId]: assign({}, allAPIs[uniqueId], config) });
  }, {});
}
