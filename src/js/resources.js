import assign from 'object-assign';

export default assign(
  {},
  require('./resources/article').default,
  require('./resources/trade').default
);
