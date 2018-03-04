const serviceMuscles = require('../tools/service-muscles.js');

module.exports = function() {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { result, app } = context;

    //console.log(context);
    // Throw an error if we didn't get a text
    const musclesService = app.service('muscles');
    let error = {};
    //const stateHook  =
    let contextResult = [];
    for(const data of result.data){
      let secondaryMuscularGroup = [];
      if(data.secondaryMuscularGroupID.length > 0) {
        try{
          secondaryMuscularGroup = await serviceMuscles.searchNameMusclesSecondary(data.secondaryMuscularGroupID, musclesService);
        }catch(e) {
          // TODO
          error.secondaryMuscularGroup = e.message;
        }
      }
      let principalMuscularGroup = await serviceMuscles.searchNameMusclesPrincipal(data.principalMuscularGroupID, musclesService);
      //console.log(principalMuscularGroup);
      contextResult = [...contextResult, {
        secondaryMuscularGroup,
        principalMuscularGroup,
        ownerId: data.ownerId,
        name: data.name,
        image: data.image,
        description: data.description,
        video: data.video,
        share: data.share
      }];

    }

    context.result = { ...context.result, data: contextResult};
    // Best practise, hooks should always return the context
    return context;
  };
};
