'use strict';

const router = require('express').Router();
const knex = require('../knex');

/* ========== GET/READ ALL SERVICES ========== */
router.get('/:user_id', (req, res, next) => {
  const user_id = req.params.user_id;

  knex('services')
    .select()
    .where('user_id', user_id)
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

/* ========== GET/READ A SINGLE ITEM ========== */
// router.get('/:id', (req, res, next) => {
//   const userId = req.params.id;
//
//
//   knex
//     .first('id', 'full_name', 'email', 'password', 'location', 'role')
//     .from('profiles')
//     .where('id', userId)
//     .then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         next();
//       }
//     })
//     .catch(next);
// });


module.exports = router;