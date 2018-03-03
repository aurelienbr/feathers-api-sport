// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    //const exerciceService = app.service('exercices');

    var error = {} ;

    let keys = [
      'name',
      'image',
      'principalMuscularGroup',
      'secondaryMuscularGroup',
      'description',
      'video',
      'share'
    ];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );

    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }

    if(!data.name){
      error.name = 'missing';
      //throw new Error('ca marche');
    }else if (!validator.size16(data.name)){
      error.name = 'too long';
    }
    if(!data.image){
      error.image = 'missing';
      //throw new Error('ca marche');
    }

    if(!data.principalMuscularGroup){
      error.principalMuscularGroup = 'missing';
      //throw new Error('ca marche');
    }else if (!validator.size16(data.principalMuscularGroup)){
      error.principalMuscularGroup = 'too long';
    }


    if(Object.keys(error).length > 0){
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    const name = data.name.substring(0, 400);
    const image = data.image.substring(0, 400);
    const principalMuscularGroup = data.principalMuscularGroup.substring(0, 400);
    var secondaryMuscularGroup = '';
    var description = '';
    var video = '';
    var share = '';
    var official = '';
    var ownerId = context.params.user._id;
    //var official ='';

    if(data.secondaryMuscularGroup){
      secondaryMuscularGroup = data.secondaryMuscularGroup.substring(0, 400);
    }else if(!validator.size16(data.secondaryMuscularGroup)){
      error.secondaryMuscularGroup = 'too long';
    }
    else{
      secondaryMuscularGroup = 'no secondary group';
    }

    if(data.description){
      description = data.description.substring(0, 400);
    } else{
      description = 'no description';
    }

    if(data.video){
      video = data.video.substring(0, 400);
    } else{
      video = 'no video';
    }

    if(data.share){
      share = data.share.substring(0, 400);
    } else{
      share = 'unshared';
    }



    context.data = {
      ownerId,
      name,
      image,
      principalMuscularGroup,
      secondaryMuscularGroup,
      description,
      video,
      share,
      official
    };


    return context;
  };
};
