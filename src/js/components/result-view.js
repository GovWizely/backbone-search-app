var _       = require('lodash');
var React   = require('react');
var History = require('react-router').History;

var Form         = require('./form');
var Filters      = require('./filters');
var ArticleList  = require('./article-list');
var Messages     = require('./search-message');
var Pagination   = require('./pagination');
var ArticleActor = require('../actors/article-actor');

module.exports = React.createClass({
  mixins: [ History ],
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
          <ArticleList />
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
