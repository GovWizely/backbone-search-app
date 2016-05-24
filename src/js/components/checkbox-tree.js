import {
  concat, difference, includes, isEmpty,
  keys, map, pick, pull, pullAll, reduce, take, uniq
} from 'lodash';
import React, { PropTypes } from 'react';

const Checkbox = ({ checked, disabled, item, nestedList }) => (
  <li role="treeitem" className="mi-checkbox-tree__list__item" key={ item }>
    <label htmlFor={ item }>
      <input
        id={ item }
        type="checkbox" value={ item } readOnly disabled={ disabled }
        checked={ checked } aria-checked={ checked }
      />
      <span>&nbsp; { item }</span>
    </label>
    { nestedList }
  </li>
);
Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  item: PropTypes.string.isRequired,
  nestedList: PropTypes.object
};

const List = ({ inheritedChecked = false, items, disabled, values }) => {
  if (isEmpty(items)) return <noscript />;

  const checkboxes = map(keys(items), (item) => {
    const checked = inheritedChecked || includes(values, item);
    const nestedList = items[item] ?
      <List
        items={ items[item] }
        inheritedChecked={ checked }
        disabled={ disabled }
        values={ values }
      /> : null;
    return (
      <Checkbox
        key={ item }
        item={ item }
        checked={ checked }
        disabled={ disabled }
        nestedList={ nestedList }
      />
    );
  });
  return (
    <ul role="tree" className="mi-checkbox-tree__list">{ checkboxes }</ul>
  );
};
List.propTypes = {
  disabled: PropTypes.bool,
  inheritedChecked: PropTypes.bool,
  items: PropTypes.object.isRequired,
  values: PropTypes.array
};

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
    this.toggleShowAll = this.toggleShowAll.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
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

  toggleCollapse(e) {
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
      <a href="#" onClick={ this.toggleShowAll } className="mi-checkbox-tree__expand">
        + See { showAllText }
      </a>
    );
  }

  render() {
    if (isEmpty(this.props.items)) return null;

    const { showAll, values, visible } = this.state;
    const { disabled, itemLimit, items, label, name } = this.props;
    const visibleItems = showAll ? items : pick(items, take(keys(items), itemLimit));
    const hrefCSS = visible ? 'mi-icon mi-icon-angle-down' : 'mi-icon mi-icon-angle-right';

    const view = visible ? (
      <div>
        <List disabled={ disabled } items={ visibleItems } values={ values } />
        { this.showAllLink() }
      </div>
    ) : null;

    return (
      <section
        className="mi-checkbox-tree"
        data-name={ name }
        data-disabled={ disabled }
        onClick={ this.handleClick }
      >
        <fieldset className="mi-checkbox-tree__fieldset">
          <legend className="mi-checkbox-tree__header">
            <a role="button" onClick={ this.toggleCollapse } href="#">
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
  itemLimit: PropTypes.number,
  items: PropTypes.object.isRequired,
  label: PropTypes.string,
  maxHeight: PropTypes.number,
  name: PropTypes.string.isRequired,
  nested: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

CheckboxTree.defaultProps = {
  defaultValues: [],
  itemLimit: 5,
  items: {},
  label: 'Untitled',
  maxHeight: 180,
  nested: false
};

export default CheckboxTree;
