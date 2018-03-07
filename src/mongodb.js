const url = require('url');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
  const dbName = url.parse(config).path.substring(1);
  const promise = MongoClient.connect(process.env.MONGODB_URI).then(client => {
    // For mongodb <= 2.2
    if (client.collection) {
      return client;
    }

    return client.db(dbName);
  });

  app.set('mongoClient', promise);
};
