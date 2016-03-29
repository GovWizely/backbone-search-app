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
        <span>&nbsp; { item }</span>
      </label>
      { list(options.items[item], options) }
    </li>
  );
}

function list(items, options) {
  if (_.isEmpty(items)) return null;
  return (
    <ul role="tree" className="list">
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
      flattenItems: null,
      visible: true,
      showAll: false,
      values: []
    };
  },

  componentDidMount: function() {
    this.onMount();
  },

  componentWillReceiveProps: function(nextProps) {
    const flattenTree = (tree, output = []) => {
      return _.reduce(tree, (output, item, key) => {
        output = output.concat(key);
        if (!_.isEmpty(item)) return flattenTree(item, output);
        return output;
      }, output);
    };

    if (!this.state.flattenItems ||
        JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
      this.setState({
        flattenItems: flattenTree(nextProps.items)
      });
    }
  },

  onMount: function() {
    this.setState({
      values: this.state.values.concat(this.props.defaultValues)
    });
  },

  handleClick: function(e) {
    const { checked, type, value } = e.target;
    if (type !== 'checkbox') return;

    const values = checked ?
      _.concat(this.state.values, value) :
      _.pull(this.state.values, value);

    this.setState({
      values: _.uniq(
        _.pullAll(values, _.difference(values, this.state.flattenItems))
      )
    });
    this.props.onChange({ name: this.props.name, values });
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

    const { label, name, onChange, values } = this.props;
    const items = this.displayableItems();
    const { showAll, visible } = this.state;
    const options = assign({}, this.props, {
      values: new Set(this.state.values)
    });
    const hrefCSS = visible ? 'mi-icon mi-icon-angle-down' : 'mi-icon mi-icon-angle-right';
    const showAllText = showAll ? 'Less' : 'More';
    const showAllLink = Object.keys(this.props.items).length > this.props.itemLimit ? <a href="#" onClick={ this.toggleShowAll } className="see-more">+ See { showAllText }</a> : null;

    const view = visible ?  (
      <div name={ name }>{ list(items, options) } { showAllLink }</div>
    ) : null;

    return (
      <section className="mi-checkbox-tree" data-name={ name } onClick={ this.handleClick }>
        <fieldset>
          <legend>
            <a role="button" onClick={ this.toggleVisibility } href="#">
              <i className={ hrefCSS }></i>&nbsp; { label }
            </a>
          </legend>
          { view }
        </fieldset>
      </section>
    );
  }
});

export default CheckboxTree;
