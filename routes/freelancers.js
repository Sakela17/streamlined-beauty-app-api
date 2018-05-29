'use strict';

const router = require('express').Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('users')
    .select('full_name', 'email', 'password', 'location', 'role')
    .then(results => {
      res.json(results);
    })
    .catch(next);
});


module.exports = router;