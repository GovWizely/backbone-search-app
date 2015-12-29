import React, { PropTypes } from 'react';

export default React.createClass({
  displayName: 'Tab',
  propTypes: {
    content: PropTypes.element.isRequired,
    tabs: PropTypes.array.isRequired
  },

  render: function() {
    const { content, tabs } = this.props;
    return (
      <div className="mi-row">
        <ul className="col-md-3 nav nav-pills nav-stacked">
          { tabs.map(function(tab) {
            const active = tab.active ? 'active' : '';
            return <li className={ active } key={ tab.title }><a href={ tab.url }>{ tab.title }</a></li>;
          }) }
        </ul>
        <div className="col-md-9">{ content }</div>
      </div>

    );
  }
});
