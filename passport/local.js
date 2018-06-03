'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const knex = require('../knex');
const { compareHashPasswords } = require('../utils/validateHashPassword');

const localStrategy = new LocalStrategy(
  {
  usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {

  let user;

  return knex('profiles')
    .where('email', email)
    .then(result => {
      console.log('******* result[0]', result[0]);
      user = result[0];
      if (!user) {
        console.log('****************** USER **', user);
        return Promise.reject({
          reason: 'LogginError',
          message: 'Incorrect email',
          location: 'email'
        });
      }
      return compareHashPasswords(password, user.password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LogginError',
          message: 'Incorrect password',
          location: 'password'

        })
      }
      return done(null, user, { success: true });
    })
    .catch(err => {
      if (err.reason === 'LogginError') {
        return done(null, false, { success: false, message: err.message });
      }
      console.log('**************** DONE ERROR', err);
      return done(err);
    })
});

module.exports = localStrategy;