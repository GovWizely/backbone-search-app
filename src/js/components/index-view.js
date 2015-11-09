var React   = require('react');
var History = require('react-router').History;

var Form  = require('./form');

module.exports = React.createClass({
  displayName: 'IndexView',
  mixins: [ History ],
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return <Form onSubmit={ this.handleSubmit } expanded={ true } history={ this.history } />;
  }
});
