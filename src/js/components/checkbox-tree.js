import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import assign from 'object-assign';

function checkbox(item, options) {
  return (
    <li className="list-item" key={ item }>
      <label>
        <input
          type="checkbox"
          value={ item }
          checked={ options.checkedItems.get(item) }
        />
        <span> { item }</span>
      </label>
      { options.nested ? list(options.items[item], options) : null }
    </li>
  );
}

function list(items, options) {
  if (_.isEmpty(items)) return null;
  return (
    <ul className="list">
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
    itemLimit: PropTypes.number,
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
      itemLimit: 5,
      items: {},
      label: 'Untitled',
      maxHeight: 180,
      nested: false
    };
  },

  getInitialState: function() {
    return {
      checkedItems: Map({}),
      visible: true,
      showAll: false
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

  toggleShowAll: function(e) {
    e.preventDefault();
    this.setState({ showAll: !this.state.showAll });
  },

  getCheckedItems: function() {
    const items = _.reduce(this.state.checkedItems.toJS(), function(result, value, item) {
      if (value) result.push(item);
      return result;
    }, []);
    return { id: this.props.id, items: items };
  },

  displayableItems: function() {
    if (this.state.showAll) return this.props.items;

    let i = 0;
    let items = {};
    for (var key in this.props.items) {
      if (typeof this.props.items[key] == 'object') {
        items[key] = assign(this.props.items[key]);
      } else {
        items[key] = this.props.items[key];
      }
      i++;
      if (i >= this.props.itemLimit) break;
    }
    return items;
  },

  render: function() {
    if (_.isEmpty(this.props.items)) return null;

    const { id } = this.props;
    const items = this.displayableItems();
    const { showAll, visible } = this.state;
    const options = assign({}, this.props, {
      checkedItems: this.state.checkedItems,
      onClick: this.handleClick
    });
    const hrefCSS = visible ? '' : 'collapsed';
    const view = visible ?  (
      <div id={ id }>{ list(items, options) }</div>
    ) : null;
    const showAllText = showAll ? 'Less' : 'More';
    const showAllLink = Object.keys(this.props.items).length > this.props.itemLimit ? <a onClick={ this.toggleShowAll } className="uk-text-small">+ See { showAllText }</a> : null;

    return (
      <section className="mi-checkbox-tree" onChange={ this.handleClick }>
        <fieldset>

          <legend>
            <a role="button" className={ hrefCSS } onClick={ this.toggleVisibility } href="#">{ this.props.label }</a>
          </legend>
            { view }
            { showAllLink }
        </fieldset>

      </section>
    );
  }
});

export default CheckboxTree;
