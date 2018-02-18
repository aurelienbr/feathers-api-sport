<<<<<<< HEAD
const { authenticate } = require("@feathersjs/authentication").hooks;
("");
const addUser = require("../../hooks/users-information");
=======
const { authenticate } = require('@feathersjs/authentication').hooks;
//const userInformation = require('../../hooks/users-information');
>>>>>>> 4fb05344227c07309e5d8b543e71984760187796

const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

const usersInformation = require('../../hooks/users-information');

module.exports = {
  before: {
    all: [],
<<<<<<< HEAD
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword(), addUser()],
    update: [hashPassword(), authenticate("jwt")],
    patch: [hashPassword(), authenticate("jwt")],
    remove: [authenticate("jwt")]
=======
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword(), usersInformation() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
>>>>>>> 4fb05344227c07309e5d8b543e71984760187796
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password")
    ],
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
