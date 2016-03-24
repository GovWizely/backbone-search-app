require('./styles/bucket_list.scss');

import { isEmpty, map } from 'lodash';
import React from 'react';

var BucketList = ({ apis, onClick, selectedAPIs }) => {
  let activeCSS = {};
  if (selectedAPIs.length === 1) {
    activeCSS[selectedAPIs[0].uniqueId] = 'active';
  }
  let buckets = map(apis, (api) => {
    return (
      <li className={ activeCSS[api.uniqueId] } key={ api.uniqueId }>
        <a onClick={ onClick.bind(undefined, api) }>{ api.shortName || api.displayName }</a>
      </li>
    );
  });
  buckets.unshift(
    <li className={ isEmpty(activeCSS) ? 'active' : '' } key="all">
      <a onClick={ onClick.bind(undefined, apis) }>All</a>
    </li>
  );
  return (
    <ul className="mi-bucket-list">
      { buckets }
    </ul>
  );
};

export default BucketList;
