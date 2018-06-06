const router = require('express').Router();
const passport = require('passport');
const knex = require('../knex');


// Post a new service
router.post('/service', (req, res, next) => {
  const { user_id, service, price = 0 } = req.body;

  const newService = {
    user_id,
    service,
    price
  };


  if (!newService.service) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `Missing service field in request body`,
      location: 'service'
    });
  }
  console.log('********* POST SERVICE', newService);


  knex('services')
    .insert(newService)
    .returning('*')
    .then(([response]) => {
      res.location(`http://${req.headers.host}/service/${response.id}`).status(201).json(response);
    })
    .catch(err => {
      // console.log('POST REQUEST ERROR', err);
      // if (err.reason === 'ValidationError') {
      //   return res.status(err.code).json(err);
      // }
      next(err);
    });
});

// Update a service
router.put('/service/:id', (req, res, next) => {
  const id = req.params.id;
  const { service, price } = req.body;

  console.log('************* ID', id);
  // console.log('************* SERVICE', req.body);



  knex('services')
    .update({ service, price })
    .where('id', id)
    .returning('*')
    .then(([response]) => {
      res.json(response);
    })
    .catch(next);

});

router.delete('/service/:id', (req, res, next) => {

  const id = req.params.id;
  console.log(id);

  knex('services')
    .where('id', id)
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});




//Protect endpoints using JWT Strategy
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/details', (req, res, next) => {
  console.log('************ USER ', req.user);
  const user_id = req.user.user_id;

  knex('profiles')
    .select('user_id', 'full_name', 'email', 'location', 'role', 'service_type')
    .where('user_id', user_id)
    .then(response => {
      if (response[0]) {
        res.json(response[0]);
      } else {
        next();
      }
    })
    .catch(next);
});






module.exports = router;