// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const exercicesValidator = require ('../tools/service-exercice.js');
const serviceSessions = require ('../tools/service-session.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    //const exerciceService = app.service('exercices');
    const sessionService = app.service('sessions');

    var ownerId = context.params.user._id;
    //var ownerId = '5a96e3f7e296d20184f23f4f';
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

    let name = '';
    if(!data.name){
      error.name = 'missing';
    } else if (!validator.size16(data.name)){
      error.name = 'too long';
    }else{
      try{
        name = await serviceSessions.verifSessions(data.name.toLowerCase().substring(0, 400), ownerId, sessionService);
      }catch(e) {
        error.name = e.message;
      }
    }

    let exercicesList = [];

    if(!data.exercicesList){
      error.exercicesList = 'missing';
    }else if (data.exercicesList){
      try {
        exercicesList = await serviceSessions.searchExercice(data.exercicesList,sessionService);
      } catch (e) {
        error.exercicesList = e.message;
      }
    }

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }
    
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
