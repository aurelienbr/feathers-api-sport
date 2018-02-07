// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text

    //const stateHook =

    if(!data.firstName){

      throw new Error('A message must have a firstName');
    }



    // The authenticated user
    const user = context.params.user;
    // The actual message text
    const firstName = context.data.firstName.substring(0, 400);

    /*const surname = context.data.surname.substring(0, 400);

    const phoneNumber = context.data.phoneNumber.substring(0, 400);

    const email = context.data.email.substring(0, 400);
    const gender = context.data.gender.substring(0, 400);
    // Override the original data (so that people can't submit additional stuff)
    const password = context.data.password.substring(0, 400);*/


    context.data = {
      firstName,
      ...data

      /*,
      surname,
      phoneNumber,
      email,
      gender,
      password,*/


      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
