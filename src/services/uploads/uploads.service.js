// Initializes the `uploads` service on path `/uploads`
const hooks = require('./uploads.hooks');
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const options = { paginate };
  const blobStorage = fs('/feather/api-feathers/public/images'); // link to change, where the local will be store

  // Initialize our service with any options it requires
  app.use('/uploads', blobService({ Model: blobStorage }));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');

  service.hooks(hooks);
};
