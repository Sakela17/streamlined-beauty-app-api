'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');




const { PORT, CLIENT_ORIGIN } = require('./config');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');
const servicesRouter = require('./routes/services');

// Create an express application
const app = express();

const passport = require('passport');
const localStrategy = require('./passport/local');

// Log all requests. Skip logging during
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

// Parse request body
app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
// const { Strategy: LocalStrategy } = require('passport-local');
// const localStrategy = new LocalStrategy((username, password, done) => {
//   try {
//     if (username !== 'bobuser') {
//       console.log('Incorrect username');
//       return done(null, false);
//     }
//     if (password !== 'baseball') {
//       console.log('Incorrect password');
//       return done(null, false);
//     }
//     const user = { username, password };
//     done(null, user);
//
//   } catch (err) {
//     done(err);
//   }
// });




passport.use(localStrategy);

// const localAuth = passport.authenticate('local', {session: false});
//
// app.post('/api/user', localAuth, function (req, res) {
//   res.json( req.user );
// });


app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/services', servicesRouter);


// Catch-all 404
app.use(function (req, res, next) {
  console.log('***************** 404 ERROR ************');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  console.log('***************** MAIN ERROR ***********', err.status);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`Server listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}




// Export for testing
module.export = app;