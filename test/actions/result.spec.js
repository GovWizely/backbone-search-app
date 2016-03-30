import { expect } from 'chai';

import * as actions from '../../src/js/actions/result.js';

describe('actions/result', () => {
  let api = { uniqueId: 'id' };
  let payload = { id: api.uniqueId };

  it('should create an action to request results', () => {
    const expectedAction = {
      type: actions.REQUEST_RESULTS,
      meta: api.uniqueId
    };
    expect(actions.requestResults(api)).to.eql(expectedAction);
  });


  it('should create an action to receive results', () => {
    const expectedAction = {
      type: actions.RECEIVE_RESULTS,
      meta: api.uniqueId,
      payload
    };
    expect(actions.receiveResults(api, payload)).to.eql(expectedAction);
  });

  it('should create an action to indicate failure when requesting results', () => {
    const expectedAction = {
      type: actions.FAILURE_RESULTS,
      error: true,
      meta: api.uniqueId,
      payload
    };
    expect(actions.failureResults(api, payload)).to.eql(expectedAction);
  });
});
