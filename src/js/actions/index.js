import assign from 'object-assign';

module.exports = assign(
  {},
  require('./api'),
  require('./filter'),
  require('./notification'),
  require('./path'),
  require('./query'),
  require('./result'),
  require('./window')
);
