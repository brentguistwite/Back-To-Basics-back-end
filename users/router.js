const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');
const { Strategy: LocalStrategy, } = require('passport-local');

const { User, } = require('./models');

const router = express.Router();

router.use(bodyParser.json());

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  User
    .findOne({ username, })
    .then((results) => {
      user = results;

      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username',
        });
      }

      return user.validatePassword(password);
    })
    .then((isValid) => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password',
        });
      }
      return done(null, user);
    })
    .catch((err) => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }

      return done(err);
    });
});

passport.use(localStrategy);

// Post to register a new user
router.post('/users', (req, res) => {
  const requiredFields = [ 'username', 'password', ];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField,
    });
  }

  const stringFields = [ 'username', 'password', 'firstName', 'lastName', ];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField,
    });
  }

  // If the username and password aren't trimmed we give an error.  Users might
  // Expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // Explicitly so the users know what's happening, rather than silently
  // Trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // To log in, so it's less of a problem.
  const explicityTrimmedFields = [ 'username', 'password', ];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField,
    });
  }

  const sizedFields = {
    username: {min: 1,},
    password: {
      min: 8,
      // Bcrypt truncates after 72 characters, so let's not give the illusion
      // Of security by storing extra (unused) info
      max: 72,
    },
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField,
    });
  }

  let { username, password, firstName = '', lastName = '', } = req.body; // eslint-disable-line
  // Username and password come in pre-trimmed, otherwise we throw an error
  // Before this
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({ username, })
    .count()
    .then((count) => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username',
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then((digest) => {
      return User.create({
        username,
        password: digest,
        firstName,
        lastName,
      });
    })
    .then((user) => {
      return res.status(201).location(`/api/users/${user.id}`).json(user.apiRepr());
    })
    .catch((err) => {
      // Forward validation errors on to the client, otherwise give a 500
      // Error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error', });
    });
});

router.get('/users/:id', (req, res) => {
  return User.findById(req.params.id)
    .then(user => res.json(user.apiRepr()))
    .catch(err => res.status(500).json({ message: 'Internal server error', }));
});

const localAuth = passport.authenticate('local', { session: false, });

// ===== Protected endpoint =====
router.post('/login', localAuth, (req, res) => {
  console.log(`${req.user.username} successfully logged in.`);
  return res.json({ data: 'rosebud', });
});

module.exports = { router, };
