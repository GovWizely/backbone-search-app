import _ from 'lodash';
import React from 'react';
import { History } from 'react-router';

import Form         from '../components/form';
import Filters      from '../components/filters';
import ResultList  from '../components/result-list';
import Messages     from '../components/search-message';
import Pagination   from '../components/pagination';
import ArticleActor from '../actors/article-actor';
import ArticleStore from '../stores/article-store';

export default React.createClass({
  displayName: 'Result',
  propTypes: {
    location: React.PropTypes.object.isRequired
  },
  mixins: [ History ],
  getInitialState: function() {
    return {
      articles: ArticleStore.getArticles(),
      isLoading: true
    };
  },
  componentWillMount: function() {
    ArticleActor.search(this.props.location.query);
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      ArticleActor.search(nextProps.location.query);
    }
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ articles  : ArticleStore.getArticles() });
    this.setState({ isLoading : false });
  },
  result: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-muted">Filter Results</h4>
          <Filters />
        </div>
        <div className="col-md-9">
          <Messages />
          <ResultList items={ this.state.articles }/>
          <Pagination history={ this.history } />
         </div>
       </div>
    );
  },
  render: function() {
    return (
      <div>
        <div className="searchbar row">
          <Form expanded={ false } history={ this.history } />
        </div>
        { this.result() }
      </div>
    );
  }
});
