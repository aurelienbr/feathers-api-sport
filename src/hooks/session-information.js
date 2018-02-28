// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

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

    if(!data.firstName){
      error.firstName = 'missing';
    } else if (!validator.size16(data.firstName)){
      error.firstName = 'too long';
    }

    return context;
  };
};
