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
    cssClass: PropTypes.string,
    id: PropTypes.string.isRequired,
    itemCssClass: PropTypes.string,
    items: PropTypes.object.isRequired,
    label: PropTypes.string,
    listCssClass: PropTypes.string,
    nested: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      listCssClass: 'list-group',
      itemCssClass: 'list-group-item checkbox',
      items: {},
      label: 'Untitled',
      nested: false,
      cssClass: ''
    };
  },

  getInitialState: function() {
    return {
      checkedItems: Map({})
    };
  },

  handleClick: function(e) {
    this.setState(({ checkedItems }) => ({
      checkedItems: checkedItems.update(e.target.value, () => e.target.checked)
    }), () => this.props.onChange(this.getCheckedItems()));
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

    const options = assign({}, this.props, {
      items: this.props.items,
      checkedItems: this.state.checkedItems,
      onClick: this.handleClick
    });

    const { id } = this.props;
    const collapsibleTarget = `#${id}`;
    return (
      <section className={ this.props.cssClass } onChange={ this.handleClick }>
        <fieldset>
          <h5>
            <legend>
              <a role="button" data-toggle="collapse" href={ collapsibleTarget }>{ this.props.label }</a>
            </legend>
          </h5>
          <div className="collapse in overflow" id={ id }>
            { list(this.props.items, options) }
          </div>
        </fieldset>
      </section>
    );
  }
});

export default CheckboxTree;
