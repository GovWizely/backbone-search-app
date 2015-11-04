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
  mixins: [ History ],
  _onChange: function() {
    this.setState({ articles  : ArticleStore.getArticles() });
    this.setState({ isLoading : false });
  },
  getInitialState: function() {
    return {
      articles: ArticleStore.getArticles(),
      isLoading: true
    };
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  componentWillMount: function() {
    if (_.isEmpty(this.props.location.query)) {
      this.history.pushState(null, '/');
    } else {
      ArticleActor.search(this.props.location.query);
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      ArticleActor.search(nextProps.location.query);
    }
  },
  result: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-muted">Advance Options</h4>
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
        <div className="row">
          <Form expanded={ false } history={ this.history } />
        </div>
        { this.result() }
      </div>
    );
  }
});
