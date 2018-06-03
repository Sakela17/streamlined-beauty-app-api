const router = require('express').Router();
const passport = require('passport');
const localStrategy = require('../passport/local');

const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);

// router.post('/signin', localAuth, function(req, res) {
//   // const authToken = createAuthToken(req.user);
//   // res.json({ authToken });
//   console.log('***************** LOGIN RAN');
//   res.json(req.user);
// });

// Implement passport.authenticate custom callback
router.post('/signin', function(req, res, next) {
  passport.authenticate('local', options, function(err, user, response) {
    if (response.success) {
      // const authToken = createAuthToken(user);
      // res.json({ authToken });
      res.json(user);
    }
    res.status(401).json({
      message: response.message
    });
  })(req, res, next);
});


module.exports = router;