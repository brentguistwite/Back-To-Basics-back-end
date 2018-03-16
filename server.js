require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const { router: usersRouter, } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy, } = require('./auth');

const {PORT, CLIENT_ORIGIN,} = require('./config');
const {dbConnect,} = require('./db-mongoose');
mongoose.Promise = global.Promise;
const app = express();

app.use(
  bodyParser.json()
);

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', { skip: (req, res) => process.env.NODE_ENV === 'test', }) // eslint-disable-line
);

app.use(
  cors({origin: CLIENT_ORIGIN,})
);

app.use('/users', usersRouter);
app.use('/auth', authRouter);

passport.use(localStrategy);
passport.use(jwtStrategy);



function runServer (port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', (err) => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app,};
