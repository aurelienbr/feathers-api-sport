const sessionInformation = require('../../hooks/session-information.js');
const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [/*authenticate('jwt'),*/ sessionInformation()],
    update: [
      authenticate('jwt'),
      sessionInformation(),
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
      sessionInformation(),
      hooks.restrictToRoles({
        roles: ['admin'],
        fieldName: 'permissions',
        idField: '_id',
        ownerField: 'ownerId',
        owner: true
      })
    ],
    remove: [
      authenticate('jwt'),
      hooks.restrictToRoles({
        roles: ['admin'],
        fieldName: 'permissions',
        idField: '_id',
        ownerField: 'ownerId',
        owner: true
      })
    ]
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
