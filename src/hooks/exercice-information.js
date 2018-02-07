// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    var error = {} ;

    if(!data.name){
      error.name = 'missing';
      //throw new Error('ca marche');
    }
    if(!data.image){
      error.image = 'missing';
      //throw new Error('ca marche');
    }
    if(!data.principalMuscularGroup){
      error.principalMuscularGroup = 'missing';
      //throw new Error('ca marche');
    }


    if(Object.keys(error).length > 0){
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    const name = context.data.name.substring(0, 400);
    const image = context.data.image.substring(0, 400);
    const principalMuscularGroup = context.data.principalMuscularGroup.substring(0, 400);
    var secondaryMuscularGroup = '';
    var description = '';
    var video = '';
    var share = '';
    //var official ='';

    if(data.secondaryMuscularGroup){
      secondaryMuscularGroup = context.data.secondaryMuscularGroup.substring(0, 400);
    } else{
      secondaryMuscularGroup = 'no secondary group';
    }

    if(data.description){
      description = context.data.description.substring(0, 400);
    } else{
      description = 'no description';
    }

    if(data.video){
      video = context.data.video.substring(0, 400);
    } else{
      video = 'no video';
    }

    if(data.share){
      share = context.data.share.substring(0, 400);
    } else{
      share = 'unshared';
    }

    /*if(data.official){
      official = context.data.official.substring(0, 400);
    } else{
      official = 'unshared';
    }*/

    context.data = {
      name,
      image,
      principalMuscularGroup,
      secondaryMuscularGroup,
      description,
      video,
      share
    };


    return context;
  };
};