const planningInformation = require('../../hooks/planning-information.js');
const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticate('jwt')],
    create: [authenticate('jwt'), planningInformation()],
    update: [
      authenticate('jwt'),
      planningInformation(),
      hooks.restrictToRoles({
        roles: ['admin'],
        fieldName: 'permissions',
        idField: '_id',
        ownerField: 'ownerId',
        owner: true
      })
    ],
    patch: [
      authenticate('jwt'),
      planningInformation(),
      hooks.restrictToRoles({
        roles: ['admin'],
        fieldName: 'permissions',
        idField: '_id',
        ownerField: 'ownerId',
        owner: true
      })
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
