const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const app = express(feathers());

module.exports = {
  existMail(email){
    var user = app.service('users').find({
      query: {
        email: email
      }
    });

    if(Object.keys(user).length > 0){
      return false;
    }else{
      return true;
    }
  }
};
