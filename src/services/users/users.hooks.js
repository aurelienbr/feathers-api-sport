const { authenticate } = require("@feathersjs/authentication").hooks;

const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

const usersInfomation = require("../../hooks/users-information");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticate("jwt")],
    create: [hashPassword(), usersInfomation()],
    update: [hashPassword(), authenticate("jwt"), usersInfomation()],
    patch: [hashPassword(), authenticate("jwt")],
    remove: [authenticate("jwt")]
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
