// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const exercicesValidator = require ('../tools/service-exercice.js');
const serviceSession = require ('../tools/service-session.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    //const exerciceService = app.service('exercices');
    const sessionService = app.service('sessions');

    //var ownerId = context.params.user._id;
    var ownerId = '5a96e3f7e296d20184f23f4f';
    var error = {};

    let keys = [
      'name',
      'image',
      'exercicesList',
      'description',
      'share',
      'official'
    ];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );

    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }

    const sessionValid = await serviceSession.searchIdSession(data.name, ownerId,sessionService);
    if(!data.name){
      error.name = 'missing';
    } else if (!sessionValid) {
      error.name = `session ${data.name} already exist `;
    }else if (!validator.size16(data.name)){
      error.name = 'too long';
    }

    let exercicesList = [];

    if(!data.exercicesList){
      error.exercicesList = 'missing';
    }else if (data.exercicesList){
      try {
        exercicesList = await serviceSession.searchExercice(data.exercicesList,sessionService);
      } catch (e) {
        error.exercicesList = e.message;
      }
    }

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }
    const name = data.name.substring(0, 400);
    var description = '';
    var share = '';
    var image = '';
    var official = '';

    if(data.description){
      description = data.description.substring(0, 400);
    } else{
      description = 'no description';
    }

    if(data.image){
      description = data.image.substring(0, 400);
    } else{
      description = 'no description';
    }

    if(data.share){
      share = data.share.substring(0, 400);
    } else{
      share = 'unshared';
    }


    context.data = {
      ownerId,
      name,
      exercicesList,
      description,
      share,
      image,
      official
    };

    return context;
  };
};
