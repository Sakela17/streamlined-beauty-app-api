const router = require('express').Router();
const passport = require('passport');
const knex = require('../knex');

//Protect endpoints using JWT Strategy
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
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