'use strict';

const router = require('express').Router();
const knex = require('../knex');

/* ========== GET/READ ALL PROFILES ========== */
router.get('/', (req, res, next) => {
  knex('profiles')
    // .select()
    .where('role', 'pro')
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

/* ========== GET/READ A SINGLE PROFILE ========== */
router.get('/:user_id', (req, res, next) => {
  console.log('***************', req.params);
  const userId = req.params.user_id;
  knex
    .first()
    .from('profiles')
    .where('user_id', userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        next();
      }
    })
    .catch(next);
});

/* ========== GET/READ ALL SERVICES BY USER ID ========== */
router.get('/services/:user_id', (req, res, next) => {
  const user_id = req.params.user_id;
  knex('services')
    .select()
    .where('user_id', user_id)
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

module.exports = router;