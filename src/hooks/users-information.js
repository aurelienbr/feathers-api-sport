// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const emailValidator = require('../tools/email.js');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    // Throw an error if we didn't get a text

    //const stateHook  =
    var error = {};

    let keys = [
      "firstName",
      "surname",
      "email",
      "phoneNumber",
      "gender",
      "password"
    ];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );

    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }

    if(data.firstName){
      if(!validator.size16(data.firstName)){
        error.firstName = 'too long';
      }
    }else if(!data.firstName){
      error.firstName = 'missing';
    }

    if(data.surname){
      if(!validator.size16(data.surname)){
        error.surname = 'too long';
      }
    }else if(!data.surname){
      error.surname = 'missing';
    }

    if(!data.email || !validator.verifMail(data.email)){
      error.email = 'invalid format';
    } else if(!data.email){
      error.email = 'missing';
    }
    /*  }else if(!emailValidator.existMail(data.mail)){
        error.email = 'user already exist';
      }*/


    if(data.phoneNumber){
      if(!validator.verifPhone(data.phoneNumber)){
        error.phoneNumber = 'invalid phoneNumber';
      }
    }else if(!data.phoneNumber){
      error.phoneNumber = 'missing';
    }


    if(data.gender){
      if(!validator.verifGender(data.gender)){
        error.gender ='Gender must be M or F';
      }
    }else if(!data.gender){
      error.gender = 'missing';
    }

    if(data.password){
      if(!validator.verifPassword(data.Password)){
        error.password = 'invalid password';
      }
    }
    if(!data.password){
      error.password = 'missing';
    }


    /*if (!data.passwordConfirmation) {
      error.passwordConfirmation = "password confirmation is missing";
    } else if (!validate.equalValue(data.password, data.passwordConfirmation)) {
      error.password = "password must be same";
      error.passwordConfirmation = "password must be same";
    }*/


    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest("Invalid Parameters", error);
    }
    // The authenticated user
    const userId = context.params.user._id;
    // The actual message text

    context.data = {
      userId,
      firstName: data.firstName,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      email: data.email,
      gender: data.gender
      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
