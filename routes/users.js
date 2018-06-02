'use strict';

const router = require('express').Router();
const knex = require('../knex');
const bcrypt = require('bcryptjs');


const validateFields = require('../utils/validators');
const hashPassword = require('../utils/hashPassword');

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
    .then(response => {
      res.location(`${req.originalUrl}/${response.user_id}`).status(201).json(response);
    })
    .catch(err => {
      console.log('***** CATCH ERROR FROM USERS POST *****', err.code);
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      if (err.code === '23505') {
        const errBlock = {
          code: 400,
          reason: 'ValidationError',
          message: `The email already exists`,
          location: 'email'
        }
        return res.status(errBlock.code).json(errBlock);
      }
      next();
    });
});




module.exports = router;