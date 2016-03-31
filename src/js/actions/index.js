import assign from 'object-assign';
import * as apiActions from './api';
import * as filterActions from './filter';
import * as notificationActions from './notification';
import * as pathActions from './path';
import * as queryActions from './query';
import * as queryExpansionActions from './query_expansion';
import * as resultActions from './result';
import * as windowActions from './window';

module.exports = assign(
  {},
  require('./api'),
  require('./filter'),
  require('./notification'),
  require('./path'),
  require('./query'),
  require('./query_expansion'),
  require('./result'),
  require('./window')
);
