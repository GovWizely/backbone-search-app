require('./styles/checkbox_tree.scss');

import {
  concat, difference, includes, isEmpty,
  keys, pick, pull, pullAll, reduce, take, uniq
} from 'lodash';
import React, { PropTypes } from 'react';
import assign from 'object-assign';

function checkbox(item, options) {
  let checked = includes(options.values, item);
  return (
    <li role="treeitem" className="list-item" key={ item }>
      <label htmlFor={ item }>
        <input id={ item }
          type="checkbox" value={ item } readOnly disabled={ options.disabled }
          checked={ checked } aria-checked={ checked }
        />
        <span>&nbsp; { item }</span>
      </label>
      { list(options.items[item], options) }
    </li>
  );
}

function list(items, options) {
  if (isEmpty(items)) return null;
  return (
    <ul role="tree" className="list">
      { keys(items).map(item => checkbox(item, options)) }
    </ul>
  );
}

class CheckboxTree extends React.Component {
  constructor() {
    super();
    this.state = {
      flattenItems: null,
      visible: true,
      showAll: false,
      values: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillReceiveProps(nextProps) {
    const flattenTree = (tree, output = []) => (
      reduce(tree, (_output, item, key) => {
        const out = _output.concat(key);
        if (!isEmpty(item)) return flattenTree(item, out);
        return out;
      }, output)
    );

    if (!this.state.flattenItems ||
        JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
      this.setState({
        flattenItems: flattenTree(nextProps.items)
      });
    }
  }

  onMount() {
    this.setState({
      values: this.state.values.concat(this.props.defaultValues)
    });
  }

  handleClick(e) {
    const { checked, type, value } = e.target;
    if (type !== 'checkbox') return;

    const values = checked ?
      concat(this.state.values, value) :
      pull(this.state.values, value);

    this.setState({
      values: uniq(
        pullAll(values, difference(values, this.state.flattenItems))
      )
    });
    this.props.onChange({ name: this.props.name, values });
  }

  toggleVisibility(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  }

  toggleShowAll(e) {
    e.preventDefault();
    this.setState({ showAll: !this.state.showAll });
  }

  showAllLink() {
    const { showAll } = this.state;
    const { itemLimit, items } = this.props;
    const showAllText = showAll ? 'Less' : 'More';

    if (keys(items).length <= itemLimit) return null;

    return (
      <a href="#" onClick={ this.toggleShowAll } className="see-more">
        + See { showAllText }
      </a>
    );
  }

  render() {
    if (isEmpty(this.props.items)) return null;

    const { showAll, values, visible } = this.state;
    const { disabled, itemLimit, items, label, name } = this.props;
    const visibleItems = showAll ? items : pick(items, take(keys(items), itemLimit));
    const options = assign({}, this.props, { values });

    const hrefCSS = visible ? 'mi-icon mi-icon-angle-down' : 'mi-icon mi-icon-angle-right';

    const view = visible ? (
      <div name={ name }>{ list(visibleItems, options) } { this.showAllLink() }</div>
    ) : null;

    return (
      <section className="mi-checkbox-tree" data-name={ name } data-disabled={ disabled } onClick={ this.handleClick }>
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
}

CheckboxTree.propTypes = {
  defaultValues: PropTypes.array,
  disabled: PropTypes.bool,
  itemCssClass: PropTypes.string,
  itemLimit: PropTypes.number,
  items: PropTypes.object.isRequired,
  label: PropTypes.string,
  listCssClass: PropTypes.string,
  maxHeight: PropTypes.number,
  name: PropTypes.string.isRequired,
  nested: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

CheckboxTree.defaultProps = {
  defaultValues: [],
  listCssClass: 'list-group',
  itemCssClass: 'list-group-item mi-checkbox',
  itemLimit: 5,
  items: {},
  label: 'Untitled',
  maxHeight: 180,
  nested: false
};


export default CheckboxTree;
