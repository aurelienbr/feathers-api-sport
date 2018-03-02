const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');

module.exports = function (app)  {
  var user = app.service('users').find({
    query: {
      email: '1@example.com'
    }
  });
  return user;


};
