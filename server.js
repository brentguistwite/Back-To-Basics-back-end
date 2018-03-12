/*
Technologies: Node.js, Express, MongoDB, Passport, JWT
Allow users to register/login using JWT authentication
Use the spaced repetition algorithm to generate the next word pair
Pairs of words should be stored in a Mongo database
This should be a fixed array of questions for an MVP
Store the number of questions which users have answered correctly in the database
Store whatever information is needed for the algorithm about the user's answer history in the database
-------------------------------------------------------------------------------------------
A) login - POST - `${API_BASE_URL}/auth/login` - body: JSON.stringify({
               username,
               password
           })
B) refreshAuthToken - POST - `${API_BASE_URL}/auth/refresh` - headers: Authorization: `Bearer ${authToken}`
C) fetchProtectedData - GET - `${API_BASE_URL}/protected` - headers: Authorization: `Bearer ${authToken}`
D) registerUser - POST - `${API_BASE_URL}/users` - body: JSON.stringify(user)

*/
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



const jwtAuth = passport.authenticate('jwt', { session: false, });

app.get('/protected', jwtAuth, (req, res) => {
  return res.json( { data: 'rosebud', } );
});

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
