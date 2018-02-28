// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require("@feathersjs/errors");
const validate = require("../validate.js");

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    // Throw an error if we didn't get a text

    //const stateHook  =
    var error = {};

    var result = app.service('users').find({
      query: { email: data.email}
    })
    console.log(result);

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

    if (!data.firstName) {
      error.firstName = "first name is missing";
    }
    if (!data.surname) {
      error.surname = "surname is missing";
    }
    if (!data.email) {
      error.email = "email is missing";
    }
    if (!validate.isEmail(data.email)) {
      error.email = "email is wrongly formated";
    }
    if (!data.phoneNumber) {
      error.phoneNumber = "phone number is missing";
    }
    if (!data.gender) {
      error.gender = "gender is missing";
    }
    if (!data.password) {
      error.password = "password is missing";
    }

    // TODO

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
    const user = context.params.user;
    // The actual message text

    context.data = {
      firstName: data.firstName.substring(0, 400),
      surname: data.surname.substring(0, 400),
      phoneNumber: data.email.substring(0, 400),
      email: data.phoneNumber.substring(0, 400),
      gender: data.gender.substring(0, 400),
      password: data.password.substring(0, 400)

      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
