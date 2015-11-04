var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      cssClass: ''
    };
  },
  render: function() {
    var className = "header ";
    className = className.concat(this.props.cssClass);
    return (
      <header className={ className }>
        <a href="#" onClick={ this.props.onClick }>
          Find Market Intelligence <span className="phase">beta</span>
        </a>
      </header>
    );
  }
});
