const assert = require('assert');
const app = require('../../src/app');

describe('"muscles" service', () => {
  it('registered the service', () => {
    const service = app.service('muscles');

    assert.ok(service, 'Registered the service');
  });
});
