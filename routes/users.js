'use strict';

const router = require('express').Router();
const knex = require('../knex');

const validateFields = require('../utils/validators');

router.post('/', (req, res, next) => {

  validateFields(req.body)
    .then(newUser => {
      return knex('users')
        .insert(newUser)
        .returning('id');
    })
    .then(([id]) => {
      return {id: id};
    })
    .then(results => {
      if(results) {
        console.log('*********** RESULTS = ID ***********', results);
        // res.status(201).json(results.id);
        res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
      } else {
        console.log('********* ELSE ********');
        next()
      }
    })
    .catch(err => {
      console.log('****************** CATCH ERROR *****', err);
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        console.log('************ VALIDATION ERROR **********');
        return res.status(err.code).json(err);
      }
      // res.status(500).json({code: 500, message: 'Internal server error'});
      next();
    });

});




module.exports = router;