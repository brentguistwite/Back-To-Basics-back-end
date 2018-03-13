const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

/*
A) login - POST - `${API_BASE_URL}/auth/login` - body: JSON.stringify({
               username,
               password
           })
B) refreshAuthToken - POST - `${API_BASE_URL}/auth/refresh` - headers: Authorization: `Bearer ${authToken}`
C) fetchProtectedData - GET - `${API_BASE_URL}/protected` - headers: Authorization: `Bearer ${authToken}`
D) registerUser - POST - `${API_BASE_URL}/users` - body: JSON.stringify(user)
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
*/

const createAuthToken = function (user) {
  return jwt.sign({ user, }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256',
  });
};

const localAuth = passport.authenticate('local', { session: false, });
router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({ authToken, });
});

const jwtAuth = passport.authenticate('jwt', { session: false, });

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken, });
});

module.exports = { router, };
