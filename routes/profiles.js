'use strict';

const router = require('express').Router();
const knex = require('../knex');

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  knex('profiles')
    // .select()
    .where('role', 'pro')
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const userId = req.params.id;


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


module.exports = router;