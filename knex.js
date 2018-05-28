'use strict';

// Primary target environment for knex is Node.js
const environment = process.env.NODE_ENV || 'development';

const knexConfig = require('./knexfile')[environment];

// Initialize Knex
// knex module is a function that takes a configuration object for Knex
// At the minimum, the config object needs to have a client (we use pg) and connection (database URL) properties
module.exports = require('knex')(knexConfig);