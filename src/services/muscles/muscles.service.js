// Initializes the `muscles` service on path `/muscles`
const createService = require('feathers-mongodb');
const hooks = require('./muscles.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/muscles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('muscles');

  mongoClient.then(db => {
    service.Model = db.collection('muscles');
  });

  service.hooks(hooks);
};
