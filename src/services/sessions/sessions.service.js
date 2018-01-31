// Initializes the `sessions` service on path `/sessions`
const createService = require('feathers-mongodb');
const hooks = require('./sessions.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/sessions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sessions');

  mongoClient.then(db => {
    service.Model = db.collection('sessions');
  });

  service.hooks(hooks);
};
