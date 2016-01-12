var React = require('react');

module.exports = React.createClass({
  displayName: 'Header',
  propTypes: {
    cssClass: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      cssClass: ''
    };
  },
  render: function() {
    return (
      <header className="mi-header">
        <a href="#" onClick={ this.props.onClick }>
          Market Intelligence Search <span className="mi-header-version">beta</span>
        </a>
      </header>
    );
  }
});
