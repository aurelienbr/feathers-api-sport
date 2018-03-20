// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const serviceExercices = require('../tools/service-exercice.js');
const serviceSessions = require('../tools/service-session.js');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    const exerciceService = app.service('exercices');
    const sessionService = app.service('sessions');

    const ownerId = String(context.params.user._id);
    //var ownerId = '5a96e3f7e296d20184f23f4f';
    const sessionId = String(context.id);
    var error = {};

    /*let keys = [
      'name',
      'image',
      //'exercicesList',
      'description',
      'share',
      'official'
    ];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );

    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }*/
    let session;
    try {
      session = await serviceSessions.getIdSession(
        data.name.toLowerCase().substring(0, 400),
        sessionId,
        sessionService
      );
    } catch (e) {
      error.session = e.message;
    }

    if (!data.name) {
    } else if (!validator.size16(data.name)) {
      error.name = 'too long';
    } else {
      try {
        session.name = await serviceSessions.verifSessionWithId(
          data.name.toLowerCase().substring(0, 400),
          ownerId,
          sessionId,
          sessionService
        );
      } catch (e) {
        error.name = e.message;
      }
    }

    let exercicesList = [];
    if (!data.exercicesList) {
      error.exercicesList = 'missing';
    } else if (data.exercicesList) {
      try {
        exercicesList = await serviceExercices.verifExerciceList(
          data.exercicesList,
          exerciceService
        );
      } catch (e) {
        error.exercicesList = e.message;
      }
    }

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    if (data.description) {
      session.description = data.description.substring(0, 400);
    } else {
    }

    if (data.image) {
      session.image = data.image.substring(0, 400);
    } else {
    }

    if (data.share) {
      session.share = data.share.substring(0, 400);
    } else {
    }
    context.data = {
      ownerId: session.ownerId,
      name: session.name,
      exercicesList,
      share: session.share,
      image: session.image,
      official: session.official,
      _id: session._id
    };

    return context;
  };
};
