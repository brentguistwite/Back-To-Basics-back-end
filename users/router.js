require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const { jwtStrategy, } = require('./../auth/strategies');
const { User, } = require('./models');
const router = express.Router();

mongoose.Promise = global.Promise;

router.use(bodyParser.json());
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false, });

// Post to register a new user
router.post('/', (req, res) => {
  const requiredFields = [ 'username', 'password', 'firstName', 'lastName', ];
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

  /*
  If the username and password aren't trimmed we give an error.
  We'll silently trim the other fields, because they aren't credentials
  used to log in, so it's less of a problem.
  */
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
    username: {
      min: 1,
      max: 15,
    },
    password: {
      min: 8,
      // Bcrypt truncates after 72 characters
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
        questions: [
          { question_id: '5aa7f9b6734d1d6b712051c5', },
          { question_id: '5aa808b4734d1d6b71205d0a', },
          { question_id: '5aa80915734d1d6b71205d34', },
          { question_id: '5aa809b1734d1d6b71205e0c', },
          { question_id: '5aa80a14734d1d6b71205e9f', },
          { question_id: '5aa80a36734d1d6b71205ee9', },
          { question_id: '5aa80a66734d1d6b71205ef9', },
          { question_id: '5aa80a95734d1d6b71205f2d', },
          { question_id: '5aa80b02734d1d6b71205f4d', },
          { question_id: '5aa80958734d1d6b71205db6', },
        ],
      });
    })
    .then((user) => {
      return res.status(201).location(`/users/${user.id}`).json(user.serialize());
    })
    .catch((err) => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error', });
    });
});

// Provide users the ability to delete their own account
router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', });
    });
});

router.get('/', (req, res) => {
  User
    .find()
    .populate('questions.question_id')
    .then(users => res.status(201).json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', });
    });
});


// ===== Protected endpoint =====
router.get('/:id', jwtAuth, (req, res) => {
  console.log(`${req.user.username} successfully accessed all secret info.`);
  return User.findById(req.params.id)
    .then(user => res.json(user.serialize()))
    .catch(err => res.status(500).json({ message: 'Internal server error', }));// eslint-disable-line
});

module.exports = { router, };
