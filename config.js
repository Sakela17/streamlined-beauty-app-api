'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  // DATABASE_URL:
  //       process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //       process.env.TEST_DATABASE_URL ||
  //       'mongodb://localhost/thinkful-backend-test'
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://dev:volk0dav@localhost/sb-test',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgres://dev:volk0dav@localhost/sb-test'
};