// enable bootstrap js component
require('bootstrap');

var React         = require('react');
var ReactDOM      = require('react-dom');
var useBasename   = require('history').useBasename;
var createHistory = require('history').createHashHistory;
var Router        = require('react-router').Router;
var Route         = require('react-router').DefaultRoute;

var IndexView  = require('./js/components/index-view');
var ResultView = require('./js/components/result-view');

var history;
if (process.env.NODE_ENV === 'production') {
  history = useBasename(createHistory)({
    basename: '/market-intelligence-search-app'
  });
} else {
  history = createHistory();
}

const routes = [
  { path: '/', component: IndexView },
  { path: '/search', component: ResultView },
  { path: '*', component: IndexView },
];

ReactDOM.render((
  <Router history={ history } routes={ routes } />
), document.getElementById('main'));
