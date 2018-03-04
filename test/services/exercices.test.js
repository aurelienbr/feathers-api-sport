const assert = require('assert');
const app = require('../../src/app');

describe('"exercices" service', () => {
  it('registered the service', () => {
    const service = app.service('exercices');

    assert.ok(service, 'Registered the service');
  });
});
