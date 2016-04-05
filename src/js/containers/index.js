require('./index.scss');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import Header from '../components/header';
import { selectAPIs } from '../actions/api';

class Index extends React.Component {
  componentDidMount() {
    const { dispatch, defaultAPIs } = this.props;
    dispatch(selectAPIs(defaultAPIs));
  }
  render() {
    return (
      <div className="mi-index">
        <div className="mi-index__header-container">
          <Header />
        </div>
        <div className="mi-index__form-container">
          <Form focused onSubmit={ this.props.onSubmit } />
        </div>
      </div>
    );
  }
}
Index.propTypes = {
  defaultAPIs: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  onSubmit: PropTypes.func
};

export default connect()(Index);
