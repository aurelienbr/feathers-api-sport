const exercices = require('./exercices/exercices.service.js');
const sessions = require('./sessions/sessions.service.js');
const planning = require('./planning/planning.service.js');
const users = require('./users/users.service.js');
const muscles = require('./muscles/muscles.service.js');
module.exports = function(app) {
  app.configure(exercices);
  app.configure(sessions);
  app.configure(planning);
  app.configure(users);
  app.configure(muscles);
};
