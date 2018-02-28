// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const emailValidator = require('../tools/email.js');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;



    // Throw an error if we didn't get a text

    //const stateHook =
    var error = {} ;

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



    if(data.email){
      if(!validator.verifMail(data.email)){
        error.email = 'invalid format';
      }else if(!emailValidator.existMail(data.mail)){
        error.email = 'user already exist';
      }
    }else if(!data.email){
      error.email = 'missing';
    }


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


    if(Object.keys(error).length > 0){
      throw new errors.BadRequest('Invalid Parameters', error);
    }


    // The authenticated user
    const userId = context.params.user._id;
    // The actual message text
    const firstName = context.data.firstName.substring(0, 400);
    const surname = context.data.surname.substring(0, 400);
    const email = context.data.email.substring(0, 400);
    const phoneNumber = context.data.phoneNumber.substring(0, 400);
    const gender = context.data.gender.substring(0, 400);


    context.data = {
      userId,
      firstName,
      surname,
      phoneNumber,
      email,
      gender
      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
