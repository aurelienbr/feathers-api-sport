

const exerciceInformation = require('../../hooks/exercice-information.js');
const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), exerciceInformation()],
    update: [authenticate('jwt'), exerciceInformation(), hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})],
    patch: [authenticate('jwt'), exerciceInformation(), hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})],
    remove: [authenticate('jwt'), hooks.restrictToRoles({roles: ['admin'], fieldName: 'permissions', idField: '_id', ownerField: 'ownerId', owner: true})]
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
