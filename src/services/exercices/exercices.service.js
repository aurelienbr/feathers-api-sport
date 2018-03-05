// Initializes the `exercices` service on path `/exercices`
const createService = require('feathers-mongodb');
const hooks = require('./exercices.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/exercices', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('exercices');

  mongoClient.then(db => {
    service.Model = db.collection('exercices');
  });

  service.hooks(hooks);
};
