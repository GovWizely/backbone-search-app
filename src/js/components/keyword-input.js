var React = require('react');

module.exports = React.createClass({
  displayName: 'KeywordInput',
  propTypes: {
    expanded: React.PropTypes.bool,
    keyword: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      expanded: true
    };
  },
  handleEnter: function(e) {
    if (e.type === 'keydown' && e.which === 13) {
      this.props.onSubmit(e);
    }
  },
  render: function() {
    var inputClass     = 'form-control';
    var buttonClass    = 'btn btn-success';
    var containerClass = 'input-group';
    if (this.props.expanded) {
      inputClass     = inputClass.concat(' input-lg');
      buttonClass    = buttonClass.concat(' btn-lg');
      containerClass = containerClass.concat(' col-md-10');
    }
    return (
      <div className={ containerClass }>
        <input type="text" className={ inputClass } name="keyword" value={ this.props.keyword } onChange={ this.props.onChange } onKeyDown={ this.handleEnter } placeholder="Keyword" />
        <span className="input-group-btn">
          <button className={ buttonClass } type="button" onClick={ this.props.onSubmit }>
            <i className="fa fa-search"></i>
          </button>
        </span>
      </div>
    );
  }
});
