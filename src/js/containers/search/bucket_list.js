require('./styles/bucket_list.scss');

import { map } from 'lodash';
import React, { PropTypes } from 'react';

class Bucket extends React.Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  _onClick() {
    const { onClick, apis } = this.props;
    onClick(apis);
  }
  render() {
    const { isActive, label } = this.props;
    return (
      <li className={ isActive ? 'active' : '' }>
        <a onClick={ this._onClick }>{ label }</a>
      </li>
    );
  }
}

Bucket.propTypes = {
  apis: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const BucketList = ({ apis, onClick, selectedAPIs }) => {
  let buckets = map(apis, (api) => {
    const isActive = selectedAPIs.length === 1 && selectedAPIs[0].uniqueId === api.uniqueId;
    return (
      <Bucket
        apis={ api }
        isActive={ isActive }
        label={ api.shortName || api.displayName }
        onClick={ onClick }
      />
    );
  });
  buckets.unshift(<Bucket apis={ apis } label={ 'All' } onClick={ onClick } />);

  return (
    <ul className="mi-bucket-list">
      { buckets }
    </ul>
  );
};

BucketList.propTypes = {
  apis: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedAPIs: PropTypes.array.isRequired
};

export default BucketList;
