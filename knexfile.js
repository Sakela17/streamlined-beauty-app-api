'use strict';

const { CLIENT_ORIGIN, DATABASE_URL, TEST_DATABASE_URL } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
    debug: false, // http://knexjs.org/#Installation-debug
    pool: {min : 1 , max : 2}
  },
  test: {
    client: 'pg',
    connection: TEST_DATABASE_URL,
    pool: {min : 1 , max : 2}
  },
  production: {
    client: 'pg',
    connection: DATABASE_URL
    // connection: process.env.HEROKU_DATABASE_URL
  }
};