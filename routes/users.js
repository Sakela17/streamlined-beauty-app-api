'use strict';

const router = require('express').Router();
const knex = require('../knex');
const bcrypt = require('bcryptjs');


const validateFields = require('../utils/validators');
const hashPassword = require('../utils/hashPassword');

router.post('/', (req, res, next) => {

  // Validate user inputs
  validateFields(req.body)
    // Check whether an email already exists in DB
    .then(newUser => {
      return knex('profiles')
        .where('email', newUser.email)
        .then(response => {
          // If email does not exist, hash password and create new user
          if (!response.length) {
            return hashPassword(newUser.password)
              .then(hash => {
                return knex('profiles')
                  .insert({
                    ...newUser,
                    password: hash
                  })
                  .returning(['user_id', 'full_name', 'email', 'location', 'role', 'service_type'])
            })
          } else {
            return Promise.reject({
              code: 422,
              reason: 'ValidationError',
              message: 'Email already taken',
              location: 'email'
            });
          }
        })

    })
    .then(response => {
      res.location(`${req.originalUrl}/${response.user_id}`).status(201).json(response);
    })
    .catch(err => {
      console.log('****************** CATCH ERROR FROM USERS POST *****', err);
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