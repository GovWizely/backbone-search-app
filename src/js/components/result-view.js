var _       = require('lodash');
var React   = require('react');
var History = require('react-router').History;

var Form         = require('./form');
var Filters      = require('./filters');
var ArticleList  = require('./article-list');
var Messages     = require('./search-message');
var Pagination   = require('./pagination');
var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  displayName: 'ResultView',
  propTypes: {
    location: React.PropTypes.object.isRequired
  },
  mixins: [ History ],
  getInitialState: function() {
    return {
      articles: ArticleStore.getArticles(),
      isLoading: true
    };
  },
  componentWillMount: function() {
    ArticleActor.search(this.props.location.query);
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      ArticleActor.search(nextProps.location.query);
    }
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ articles  : ArticleStore.getArticles() });
    this.setState({ isLoading : false });
  },
  result: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-muted">Filter Results</h4>
          <Filters />
        </div>
        <div className="col-md-9">
          <Messages />
          <ArticleList articles={ this.state.articles }/>
          <Pagination history={ this.history } />
         </div>
       </div>
    );
  },
  render: function() {
    return (
      <div>
        <div className="searchbar row">
          <Form expanded={ false } history={ this.history } />
        </div>
        { this.result() }
      </div>
    );
  }
});
