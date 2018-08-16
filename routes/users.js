'use strict';

const router = require('express').Router();
const knex = require('../knex');

const validateFields = require('../utils/validators');
const { hashPassword } = require('../utils/validateHashPassword');

router.post('/', (req, res, next) => {
  // Validate user inputs
  validateFields(req.body)
    .then(newUser => {
      // Hash user's password before posting new user to DB
      return hashPassword(newUser.password)
        .then(hash => {
          return knex('profiles')
            .insert({
              ...newUser,
              password: hash
            })
            .returning(['user_id', 'full_name', 'email', 'location', 'role', 'service_type'])
        })
    })
    .then(([response]) => {
      res.location(`${req.originalUrl}/${response.user_id}`).status(201).json(response);
    })
    .catch(err => {
      console.log('***** CATCH ERROR FROM USERS POST *****');
      // Forward validation errors on to the client
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      if (err.code === '23505') {
        return res.status(400).json({
          reason: 'ValidationError',
          message: `The username already exists`,
          location: 'email'
        });
      }
      next();
    });
});

module.exports = router;