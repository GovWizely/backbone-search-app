import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import { selectAPIs } from '../actions/api';

class Index extends React.Component {
  componentDidMount() {
    const { dispatch, defaultAPIs } = this.props;
    dispatch(selectAPIs(defaultAPIs));
  }
  render() {
    return (
      <div id="mi-index">
        <Form focused onSubmit={ this.props.onSubmit } />
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
