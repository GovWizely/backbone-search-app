import { filter, map } from 'lodash';
import React, { PropTypes } from 'react';

class Bucket extends React.Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  _onClick(e) {
    e.preventDefault();
    const { onClick, apis } = this.props;
    onClick(apis);
  }
  render() {
    const { isActive, label } = this.props;
    const className = isActive ?
      'mi-bucket-list__item mi-bucket-list__item--active' :
      'mi-bucket-list__item';
    return (
      <li className={ className }>
        <a className="mi-bucket-list__item__link" onClick={ this._onClick }>{ label }</a>
      </li>
    );
  }
}

Bucket.propTypes = {
  apis: PropTypes.any.isRequired,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const BucketList = ({ apis, onClick, selectedAPIs }) => {
  const bucketAPIs = filter(apis, api => api.bucket.enable);
  if (bucketAPIs.length < 2) return null;

  const buckets = map(bucketAPIs, (api) => {
    if (!api.bucket.enable) return null;

    const isActive = selectedAPIs.length === 1 && selectedAPIs[0].uniqueId === api.uniqueId;
    return (
      <Bucket
        key={ api.uniqueId }
        apis={ api }
        isActive={ isActive }
        label={ api.shortName || api.displayName }
        onClick={ onClick }
      />
    );
  });
  buckets.unshift(
    <Bucket
      key="All"
      apis={ apis }
      isActive={ selectedAPIs.length > 1 }
      label={ 'All' }
      onClick={ onClick }
    />
  );

  return (
    <ul className="mi-bucket-list">
      { buckets }
    </ul>
  );
};

BucketList.propTypes = {
  apis: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedAPIs: PropTypes.array.isRequired
};

export default BucketList;
