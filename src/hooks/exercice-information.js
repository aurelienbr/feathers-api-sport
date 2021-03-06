// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const serviceMuscles = require('../tools/service-muscles.js');
const serviceExercices = require('../tools/service-exercice.js');
const serviceUpload = require('../tools/service-upload.js');
const validator = require('../tools/userInformations.js');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    const musclesService = app.service('muscles');
    const exerciceService = app.service('exercices');
    const uploadService = app.service('uploads');
    let ownerId = String(context.params.user._id);
    let error = {};

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

    let name = '';
    if (!data.name) {
      error.name = 'missing';
    } else if (!validator.size16(data.name)) {
      error.name = 'too long';
    } else {
      try {
        name = await serviceExercices.verifExercice(
          data.name.toLowerCase().substring(0, 400),
          ownerId,
          exerciceService
        );
      } catch (e) {
        error.name = e.message;
      }
    }

    if (!data.principalMuscularGroup) {
      error.principalMuscularGroup = 'missing';
    }

    let secondaryMuscularGroupID = [];

    if (!data.secondaryMuscularGroup) {
      error.secondaryMuscularGroup = 'missing';
    } else if (data.secondaryMuscularGroup) {
      try {
        secondaryMuscularGroupID = await serviceMuscles.searchIdMusclesSecondary(
          data.secondaryMuscularGroup,
          musclesService
        );
      } catch (e) {
        error.secondaryMuscularGroup = e.message;
      }
    }

    let principalMuscularGroupID;
    if (!data.principalMuscularGroup) {
      error.principalMuscularGroup = 'missing';
    } else if (data.principalMuscularGroup) {
      principalMuscularGroupID = await serviceMuscles.searchIdMusclesPrincipal(
        data.principalMuscularGroup,
        musclesService
      );
      if (principalMuscularGroupID === undefined) {
        error.principalMuscularGroupID = `muscle ${
          data.principalMuscularGroup
        } does not exists`;
      }
    }

    //const name = data.name.substring(0, 400);
    // TODO

    let description = '';
    let video = '';
    let share = '';
    let image = '';
    //var ownerId = context.params.user._id;
    //var official ='';

    if (data.description) {
      description = data.description.substring(0, 400);
    } else {
      description = 'no description';
    }

    if (data.image) {
      if (validator.verifImage(data.image)) {
        try {
          image = await serviceUpload.uploadImage(data.image, uploadService);
        } catch (e) {
          error.image = 'not an image';
        }
      } else {
        console.log('error image');
        error.image = 'not an image';
      }
    } else {
      image = 'no image';
    }

    if (data.video) {
      // TODO
      video = data.video.substring(0, 400);
    } else {
      video = 'no video';
    }

    if (data.share) {
      share = data.share.substring(0, 400);
    } else {
      share = 'unshared';
    }
    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    context.data = {
      principalMuscularGroupID,
      secondaryMuscularGroupID,
      ownerId,
      name,
      image: image.id,
      description,
      video,
      share
    };

    return context;
  };
};
