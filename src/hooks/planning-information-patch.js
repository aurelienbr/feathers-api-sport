// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const serviceSessions = require('../tools/service-session.js');
const servicePlanning = require('../tools/service-planning.js');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;
    const sessionService = app.service('sessions');
    const planningService = app.service('planning');

    const ownerId = context.params.user._id;
    //var ownerId = '5a96e3f7e296d20184f23f4f';
    var error = {};

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    context.data = {
      ownerId,
      sessionsList
    };

    return context;
  };
};
