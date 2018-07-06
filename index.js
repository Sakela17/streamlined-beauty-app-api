'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, CLIENT_ORIGIN, CLIENT_ORIGIN_ANGULAR } = require('./config');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');
const myProfileRouter = require('./routes/myProfile');

// Create an express application
const app = express();

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

// Log all requests. Skip logging during
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

// Parse request body
app.use(express.json());


const whitelist = [CLIENT_ORIGIN, CLIENT_ORIGIN_ANGULAR];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(
  cors(
      corsOptions
  // {
    // origin: CLIENT_ORIGIN
  // }
  )
);

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/myprofile', myProfileRouter);


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
module.exports = app;