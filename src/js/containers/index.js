import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import Header from '../components/header';
import { selectAPIs } from '../actions/api';

class Index extends React.Component {
  componentDidMount() {
    const { dispatch, enabledAPIs } = this.props;
    dispatch(selectAPIs(enabledAPIs));
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
  dispatch: PropTypes.func,
  enabledAPIs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    query: state.query
  };
}

export default connect(mapStateToProps)(Index);
