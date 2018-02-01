// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { userinformation } = context;

    // Throw an error if we didn't get a text


    if(!userinformation.firstName || !userinformation.surname || !userinformation.firstName ) {
      throw new Error('A message must have a text');
    }



    // The authenticated user
    const user = context.params.user;
    // The actual message text
    const firstName = context.data.text
      // Messages can't be longer than 400 characters
      .substring(0, 400);

    const surname = context.data.text
    .substring(0, 400);

    const phoneNumber = context.data.text
          // Messages can't be longer than 400 characters
          .substring(0, 400);

    const email = context.data.text
                // Messages can't be longer than 400 characters
                .substring(0, 400);
    const gender = context.data.text
                            // Messages can't be longer than 400 characters
                            .substring(0, 400);
    // Override the original data (so that people can't submit additional stuff)
    const password = context.data.text
                // Messages can't be longer than 400 characters
                .substring(0, 400);


    context.data = {
      firstName,
      surname,
      phoneNumber,
      email,
      gender,
      password,
      // Set the user id
      userId: user._id,
      // Add the current date
    };

    // Best practise, hooks should always return the context
    return context;
  };
};
