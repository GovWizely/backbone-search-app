import { omit } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { notify, dismissNotification } from '../actions/notification';
import { fetchResults } from '../actions/result';
import { replaceQuery } from '../actions/query';
import { updatePath } from '../actions/path';
import { updateWindow } from '../actions/window';
import { invalidateAllFilters } from '../actions/filter';
import { enableAPIs } from '../apis';
import Notification from '../components/notification';

class App extends React.Component {
  componentWillMount() {
    this.props.onResize({ currentTarget: window });
  }
  componentDidMount() {
    window.addEventListener('resize', this.props.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize);
  }
  render() {
    const { notifications, onDismissNotification } = this.props;
    return (
      <div>
        <Notification notifications={ notifications } onDismiss={ onDismissNotification } />
        { React.cloneElement(this.props.children, omit(this.props, ['children'])) }
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  notifications: PropTypes.array,
  onDismissNotification: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { apis, notifications, query } = state;
  const enabledAPIs = enableAPIs(apis);
  return {
    enabledAPIs,
    notifications,
    query,
    selectedAPIs: enabledAPIs,
    window: {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDismissNotification: (e) => {
      e.preventDefault();
      dispatch(dismissNotification(e.target.dataset.id));
    },
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(replaceQuery(query));
      if (query.q) {
        dispatch(dismissNotification('keyword_required'));
        dispatch(invalidateAllFilters());
        dispatch(fetchResults());
      } else {
        dispatch(notify({ text: 'Keyword required.', status: 'info', id: 'keyword_required' }));
      }
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
