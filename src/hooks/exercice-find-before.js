const serviceMuscles = require('../tools/service-muscles.js');
const errors = require('@feathersjs/errors');

module.exports = function() {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { result, app, params } = context;

    //console.log(context);
    // Throw an error if we didn't get a text
    const musclesService = app.service('muscles');

    let error = {};
    let principalMuscularGroupID;
    let secondaryMuscularGroupID;
    let _id;

    if (params.query.principalMuscularGroup) {
      try {
        principalMuscularGroupID = await serviceMuscles.searchIdMusclesPrincipal(
          params.query.principalMuscularGroup.substring(0, 400),
          musclesService
        );
        delete params.query.principalMuscularGroup;
        params.query = {
          ...params.query,
          principalMuscularGroupID
        };
      } catch (e) {
        error.principalMuscularGroup = e.message;
      }
    }

    if (params.query.secondaryMuscularGroup) {
      try {
        if (params.query.secondaryMuscularGroup.$in) {
          params.query.secondaryMuscularGroup =
            params.query.secondaryMuscularGroup.$in;
        } else {
          params.query.secondaryMuscularGroup = [
            params.query.secondaryMuscularGroup
          ];
        }
        secondaryMuscularGroupID = await serviceMuscles.searchIdMusclesSecondary(
          params.query.secondaryMuscularGroup,
          musclesService
        );

        delete params.query.secondaryMuscularGroup;
        params.query = {
          ...params.query,
          secondaryMuscularGroupID
        };
      } catch (e) {
        // TODO
        error.secondaryMuscularGroup = e.message;
      }
    }
    if (Object.keys(error).length > 0) {
      throw new errors.BadRequest('Invalid query parameters', error);
    }

    //console.log(context);
    //const stateHook  =

    /*contextResult = [
      ...contextResult,
      {
        secondaryMuscularGroup,
        principalMusculargroup,
        ownerId: data.ownerId,
        name: data.name,
        image: data.image,
        description: data.description,
        video: data.video,
        share: data.share,
        _id: data._id
      }
    ];

    // eslint-disable-next-line
    context.result = { ...context.result, data: contextResult };*/
    // Best practise, hooks should always return the context
    return context;
  };
};
