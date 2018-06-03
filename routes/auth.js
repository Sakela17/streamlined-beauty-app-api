const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const localStrategy = require('../passport/local');


const options = {session: false, failWithError: true};
// const localAuth = passport.authenticate('local', options);

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.email,
    expiresIn: JWT_EXPIRY
  });
}

// Implement passport.authenticate custom callback
router.post('/signin', function(req, res, next) {
  passport.authenticate('local', options, function(err, user, response) {
    if (response.success) {
      console.log('***********RESPONSE SUCCESS', response.success);
      const authToken = createAuthToken(user);
      res.json({ authToken });
    } else {
      res.status(401).json({
      message: response.message
      });
    }
    // res.status(401).json({
    //   message: response.message
    // });
  })(req, res, next);
});


module.exports = router;