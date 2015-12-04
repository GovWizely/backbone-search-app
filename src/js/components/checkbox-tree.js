import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import assign from 'object-assign';

function checkbox(item, options) {
  return (
    <li className={ options.itemCssClass } key={ item }>
      <label>
        <input
          type="checkbox"
          value={ item }
          checked={ options.checkedItems.get(item) }
        />
        { item }
      </label>
      { options.nested ? list(options.items[item], options) : null }
    </li>
  );
}

function list(items, options) {
  if (_.isEmpty(items)) return null;
  return (
    <ul className={ options.listCssClass }>
      { _.keys(items).map(item => checkbox(item, options)) }
    </ul>
  );
}

var CheckboxTree = React.createClass({
  displayName: 'CheckboxTree',
  propTypes: {
    checkedItems: PropTypes.array,
    id: PropTypes.string.isRequired,
    itemCssClass: PropTypes.string,
    items: PropTypes.object.isRequired,
    label: PropTypes.string,
    listCssClass: PropTypes.string,
    maxHeight: PropTypes.number,
    nested: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      listCssClass: 'list-group',
      itemCssClass: 'list-group-item mi-checkbox',
      items: {},
      label: 'Untitled',
      maxHeight: 180,
      nested: false
    };
  },

  getInitialState: function() {
    return {
      checkedItems: Map({}),
      visible: true
    };
  },

  handleClick: function(e) {
    this.setState(({ checkedItems }) => ({
      checkedItems: checkedItems.update(e.target.value, () => e.target.checked)
    }), () => this.props.onChange(this.getCheckedItems()));
  },

  toggleVisibility: function(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  },

  getCheckedItems: function() {
    const items = _.reduce(this.state.checkedItems.toJS(), function(result, value, item) {
      if (value) result.push(item);
      return result;
    }, []);
    return { id: this.props.id, items: items };
  },

  render: function() {
    if (_.isEmpty(this.props.items)) return null;

    const { id, items } = this.props;
    const { visible } = this.state;
    const options = assign({}, this.props, {
      checkedItems: this.state.checkedItems,
      onClick: this.handleClick
    });
    const hrefCSS = visible ? '' : 'collapsed';
    const viewStyle = { maxHeight: this.props.maxHeight, overflowY: 'auto' };
    const view = visible ?  (
      <div style={ viewStyle } id={ id }>{ list(items, options) }</div>
    ) : null;

    return (
      <section className="mi-checkbox-tree" onChange={ this.handleClick }>
        <fieldset>
          <h5>
            <legend>
              <a role="button" className={ hrefCSS } onClick={ this.toggleVisibility } href="#">{ this.props.label }</a>
            </legend>
          </h5>
        </fieldset>
        { view }
      </section>
    );
  }
});

export default CheckboxTree;
