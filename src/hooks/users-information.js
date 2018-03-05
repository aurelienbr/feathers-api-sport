const errors = require('@feathersjs/errors');
const validator = require('../tools/userInformations.js');
const usersService = require('../tools/service-users.js');

module.exports = function() {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;
    // Throw an error if we didn't get a text

    //const stateHook  =
    const serviceUsers = app.service('users');
    var error = {};

    let keys = [
      'firstName',
      'surname',
      'email',
      'phoneNumber',
      'gender',
      'password'
    ];

    const resultKey = Object.keys(data).filter(
      key => keys.includes(key) === false
    );

    if (resultKey.length > 0) {
      throw new errors.BadRequest(`Keys ${resultKey} are not valid`);
    }

    if (!data.firstName) {
      error.firstName = 'missing';
    } else if (!validator.size16(data.firstName)) {
      error.firstName = 'too long';
    }

    if (!data.surname) {
      error.surname = 'missing';
    } else if (!validator.size16(data.surname)) {
      error.surname = 'too long';
    }

    if (!data.email) {
      error.email = 'missing';
    }

    if (!validator.verifMail(data.email)) {
      error.email = 'invalid format';
    }

    const emailValid = await usersService.verifEmail(data.email, serviceUsers);
    if (!emailValid) {
      error.email = `email ${data.email} is already taken`;
    }

    if (!data.phoneNumber) {
      error.phoneNumber = 'missing';
    } else if (!validator.verifPhone(data.phoneNumber)) {
      error.phoneNumber = 'invalid phoneNumber';
    }

    if (!data.gender) {
      error.gender = 'missing';
    } else if (!validator.verifGender(data.gender)) {
      error.gender = 'Gender must be M or F';
    }

    if (!data.password) {
      error.password = 'missing';
    } else if (!validator.verifPassword(data.password)) {
      error.password = 'invalid password';
    }

    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid Parameters', error);
    }

    context.data = {
      password: data.password.substring(0, 400),
      firstName: data.firstName.substring(0, 400), // TODO first letter maj and others lowercase
      surname: data.surname.substring(0, 400), // TODO same
      phoneNumber: data.phoneNumber.substring(0, 400),
      email: data.email.toLowerCase().substring(0, 400),
      gender: data.gender.substring(0, 400)
      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
