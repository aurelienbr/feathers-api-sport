

const exerciceInformation = require('../../hooks/exercice-information.js');
const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), exerciceInformation()],
    update: [authenticate('jwt'), exerciceInformation()],
    patch: [authenticate('jwt'), exerciceInformation()],
    remove: [hooks.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })]
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
