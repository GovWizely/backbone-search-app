import { difference, includes, isEmpty, keys, map, pick, take } from 'lodash';
import React, { PropTypes } from 'react';

const Checkbox = ({ checked, children, disabled, item }) => (
  <li role="treeitem" className="mi-checkbox-tree__list__item" key={ item }>
    <label htmlFor={ item }>
      <input
        id={ item }
        type="checkbox" value={ item } readOnly disabled={ disabled }
        checked={ checked } aria-checked={ checked }
      />
      <span>&nbsp; { item }</span>
    </label>
    { children }
  </li>
);
Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.object,
  disabled: PropTypes.bool,
  item: PropTypes.string.isRequired
};

const Tree = ({ items, disabled, values }) => {
  if (isEmpty(items)) return null;

  const checkboxes = map(keys(items), (item) => {
    const checked = includes(values, item);
    return (
      <Checkbox
        key={ item }
        item={ item }
        checked={ checked }
        disabled={ disabled }
      >
        <Tree disabled={ disabled } items={ items[item] } values={ values } />
      </Checkbox>
    );
  });
  return (
    <ul role="tree" className="mi-checkbox-tree__list">{ checkboxes }</ul>
  );
};
Tree.propTypes = {
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

  onMount() {
    this.setState({
      values: this.state.values.concat(this.props.defaultValues)
    });
  }

  handleClick(e) {
    const { checked, type, value } = e.target;
    if (type !== 'checkbox') return;

    const values = difference(
      map(e.currentTarget.querySelectorAll('input:checked'), 'value'),
      checked ? [] : [value]
    );

    this.setState({ values });
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
      <a onClick={ this.toggleShowAll } className="mi-checkbox-tree__expand">
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
        <Tree disabled={ disabled } items={ visibleItems } values={ values } />
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
            <a role="button" onClick={ this.toggleCollapse }>
              <i className={ hrefCSS } />&nbsp; { label }
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
