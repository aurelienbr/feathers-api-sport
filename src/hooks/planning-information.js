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

    try {
      await servicePlanning.verifPlanning(ownerId, planningService);
    } catch (e) {
      console.log('poney');
      throw new errors.BadRequest(e.message);
    }

    let keys = ['sessionsList'];
    let sessionsListKeys = ['idSession', 'date', 'moment'];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );
    let resultsessionListKeyt;
    if (data.sessionsList) {
      resultsessionListKey = Object.keys(data.sessionsList).filter(
        sessionsListKeys =>
          sessionsListKeys.includes(sessionsListKeys) === false
      );
    }
    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }
    if (resultsessionListKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultsessionListKey} are not valid`);
    }

    /*let name = '';
    if (!data.name) {
      error.name = 'missing';
    } else if (!validator.size16(data.name)) {
      error.name = 'too long';
    } else {
      try {
        name = await serviceSessions.verifSession(
          data.name.toLowerCase().substring(0, 400),
          ownerId,
          sessionService
        );
      } catch (e) {
        error.name = e.message;
      }
    }*/

    let sessionsList = [];

    if (!data.sessionsList) {
      error.exercicesList = 'missing';
    } else if (data.sessionsList) {
      /*else if (!data.sessionsList.idSession) {
      error.idSession = 'sessionsList.idSession missing';
    } else if (!data.sessionsList.date) {
      error.date = 'sessionsList.date missing';
    } else if (!data.sessionsList.moment) {
      error.moment = 'sessionsList.moment missing';
    } */ try {
        sessionsList = await serviceSessions.verifSessionList(
          data.sessionsList,
          sessionService
        );
        if (data.sessionsList.moment) {
        }
      } catch (e) {
        throw new errors.BadRequest(e.message);
      }
    }

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
