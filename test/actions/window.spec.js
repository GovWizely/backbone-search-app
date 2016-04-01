import { expect } from 'chai';

import * as actions from '../../src/js/actions';

describe('actions/window', () => {
  it('should create an action to update window', () => {
    const payload = { innerWidth: 1000, innerHeight: 1000 };
    const expectedAction = {
      type: actions.UPDATE_WINDOW,
      payload
    };
    expect(actions.updateWindow(payload)).to.eql(expectedAction);
  });
});
