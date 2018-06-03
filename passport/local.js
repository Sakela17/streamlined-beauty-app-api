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
    .then(([_user]) => {
      console.log('******* result[0]', _user);
      user = _user;
      if (!_user) {
        console.log('****************** USER **', _user);
        return Promise.reject({
          reason: 'SigninError',
          message: 'Incorrect email',
          location: 'email'
        });
      }
      return compareHashPasswords(password, user.password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'SigninError',
          message: 'Incorrect password',
          location: 'password'

        })
      }
      // Create new user object avoiding password property
      // so it doesn't get included in jwt
      const authUser = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        location: user.location,
        role: user.role,
        service_type: user.service_type
      };
      return done(null, authUser, { success: true });
    })
    .catch(err => {
      if (err.reason === 'SigninError') {
        return done(null, false, {
          success: false,
          status: 401,
          reason: err.reason,
          message: err.message,
          location: err.location
        });
      }
      console.log('**************** DONE ERROR', err);
      return done(err);
    })
});

module.exports = localStrategy;