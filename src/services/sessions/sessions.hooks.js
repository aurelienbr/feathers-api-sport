const sessionInformation = require('../../hooks/session-information.js');
const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
<<<<<<< HEAD
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [hooks.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })]
=======
    create: [authenticate('jwt'),sessionInformation()],
    update: [authenticate('jwt'),sessionInformation(),hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})],
    patch: [authenticate('jwt'),sessionInformation(),hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})],
    remove: [authenticate('jwt'),sessionInformation(),hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})]
>>>>>>> 1efde1e7328ec7c1b8137db9a39370d245f2cf2a
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
