require('./styles/checkbox_tree.scss');

import _ from 'lodash';
import React, { PropTypes } from 'react';
import assign from 'object-assign';

function checkbox(item, options) {
  let checked = options.values.has(item);
  return (
    <li role="treeitem" className="list-item" key={ item }>
      <label htmlFor={ item }>
        <input id={ item }
           type="checkbox" value={ item } readOnly disabled={ options.disabled }
           checked={ checked } aria-checked={ checked } />
        <span> { item }</span>
      </label>
      { list(options.items[item], options) }
    </li>
  );
}

function list(items, options) {
  if (_.isEmpty(items)) return null;
  return (
    <ul role="tree" className="list" >
      { _.keys(items).map(item => checkbox(item, options)) }
    </ul>
  );
}

var CheckboxTree = React.createClass({
  displayName: 'CheckboxTree',
  propTypes: {
    disabled: PropTypes.bool,
    itemCssClass: PropTypes.string,
    itemLimit: PropTypes.number,
    items: PropTypes.object.isRequired,
    label: PropTypes.string,
    listCssClass: PropTypes.string,
    maxHeight: PropTypes.number,
    name: PropTypes.string.isRequired,
    nested: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.array
  },
  getDefaultProps: function() {
    return {
      listCssClass: 'list-group',
      itemCssClass: 'list-group-item mi-checkbox',
      itemLimit: 5,
      items: {},
      label: 'Untitled',
      maxHeight: 180,
      nested: false,
      values: []
    };
  },

  getInitialState: function() {
    return {
      visible: true,
      showAll: false
    };
  },

  handleClick: function(e) {
    const { name, values } = this.props;
    const { target } = e;
    let valueSet = new Set(values);

    target.checked ? valueSet.add(target.value) : valueSet.delete(target.value);
    this.props.onChange({ name: name, items: Array.from(valueSet) });
  },

  toggleVisibility: function(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  },

  toggleShowAll: function(e) {
    e.preventDefault();
    this.setState({ showAll: !this.state.showAll });
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

    const { name, values } = this.props;
    const items = this.displayableItems();
    const { showAll, visible } = this.state;
    const options = assign({}, this.props, {
      values: new Set(values),
      onClick: this.handleClick
    });
    const hrefCSS = visible ? '' : 'collapsed';
    const showAllText = showAll ? 'Less' : 'More';
    const showAllLink = Object.keys(this.props.items).length > this.props.itemLimit ? <a href="#" onClick={ this.toggleShowAll } className="see-more">+ See { showAllText }</a> : null;

    const view = visible ?  (
      <div name={ name }>{ list(items, options) } { showAllLink }</div>
    ) : null;

    return (
      <section className="mi-checkbox-tree" onChange={ this.handleClick }>
        <fieldset>
          <legend>
            <a role="button" className={ hrefCSS } onClick={ this.toggleVisibility } href="#">{ this.props.label }</a>
          </legend>
            { view }
        </fieldset>
      </section>
    );
  }
});

export default CheckboxTree;
