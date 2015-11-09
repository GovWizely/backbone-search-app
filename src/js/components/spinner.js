var React = require('react');

module.exports = React.createClass({
  displayName: 'Spinner',
  render: function() {
    return (
      <div className="sk-folding-cube">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube3"></div>
      </div>
    );
  }
});
