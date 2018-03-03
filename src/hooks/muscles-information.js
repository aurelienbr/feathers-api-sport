const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const serviceMuscles = require('../tools/service-muscles.js');

module.exports = function() {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;
    // Throw an error if we didn't get a text

    //const stateHook  =
    const muscleService = app.service('muscles');
    var error = {};

    let keys = [
      'name'
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

    const name = data.name.toLowerCase().substring(0, 400);

    const nameValid = await serviceMuscles.verifMuscle(name, muscleService);
    if(!nameValid) {
      error.name = `The muscle ${name} is already present`;
    }


    if(Object.keys(error).length > 0){
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    context.data = {
      name,
      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
