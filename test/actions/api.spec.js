import { expect } from 'chai';

import * as actions from '../../src/js/actions';

describe('actions/api', () => {
  it('should create an action to select APIs', () => {
    const payload = ['a', 'b', 'c'];
    const expectedAction = {
      type: actions.SELECT_APIS,
      payload
    };
    expect(actions.selectAPIs(payload)).to.eql(expectedAction);
  });
});
