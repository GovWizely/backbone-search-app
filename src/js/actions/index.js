import assign from 'object-assign';

module.exports = assign(
  {},
  require('./api'),
  require('./filter'),
  require('./path'),
  require('./query'),
  require('./query_expansion'),
  require('./result'),
  require('./window')
);
