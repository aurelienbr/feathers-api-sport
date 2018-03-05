const serviceExercices = require('../tools/service-exercice.js');

module.exports = function() {
  // eslint-disable-line no-unused-vars
  return async context => {
    const { result, app } = context;

    //console.log(context);
    // Throw an error if we didn't get a text
    const exerciceService = app.service('exercices');
    let error = {};
    //const stateHook  =
    let contextResult = [];
    for (const data of result.data) {
      let exercicesList = [];
      if (data.exercicesList.length > 0) {
        try {
          exercicesList = await serviceExercices.searchExerciceList(
            data.exercicesList,
            exerciceService
          );
        } catch (e) {
          // TODO
          error.exercicesList = e.message;
        }
      }
      contextResult = [
        ...contextResult,
        {
          exercicesList,
          ownerId: data.ownerId,
          name: data.name,
          image: data.image,
          description: data.description,
          video: data.video,
          share: data.share,
          _id: data._id
        }
      ];
    }
    // eslint-disable-next-line
    context.result = { ...context.result, data: contextResult };
    // Best practise, hooks should always return the context
    return context;
  };
};
