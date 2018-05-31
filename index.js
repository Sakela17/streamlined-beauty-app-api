'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, CLIENT_ORIGIN } = require('./config');

const knex = require('./knex');

const userRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');

// Create an express application
const app = express();

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


app.use('/api/signup', userRouter);
app.use('/api/profiles', profilesRouter);


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