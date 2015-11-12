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


const routes = [
  { path: '/', component: IndexView },
  { path: '/search', component: ResultView },
  { path: '*', component: IndexView },
];

ReactDOM.render((
  <Router history={ createHistory() } routes={ routes } />
), document.getElementById('main'));
