

const exerciceInformation = require('../../hooks/exercice-information');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [exerciceInformation()],
    update: [exerciceInformation()],
    patch: [exerciceInformation()],
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
