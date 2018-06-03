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

// Use local strategy to validate user email and password on sign in
router.post('/signin', function(req, res, next) {
  // Implement passport.authenticate custom callback
  // to pass custom messages with Loggin errors
  passport.authenticate('local', options, function(err, user, response) {
    console.log('************** RESPONSE', response);
    if (response.success) {

      const authToken = createAuthToken(user);
      res.json({ authToken });
    } else {
      res.status(401).json({
        status: response.status,
        reason: response.reason,
        message: response.message,
        location: response.location
      });
    }
  })(req, res, next);
});


module.exports = router;