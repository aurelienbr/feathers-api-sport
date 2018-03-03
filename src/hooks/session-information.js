// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

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

    if(!data.name){
      error.name = 'missing';
    } else if (!validator.size16(data.name)){
      error.name = 'too long';
    }

    if(!data.exercicesList){
      error.exercicesList = 'missing';
    }

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }
    const name = data.name.substring(0, 400);
    const exercicesList = data.exercicesList;
    var description = '';
    var share = '';
    var image = '';
    var official = '';
    var ownerId = context.params.user._id;

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
