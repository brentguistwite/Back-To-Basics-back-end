const express = require('express');

const { Question, } = require('./models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = express.Router();

// Using this to test database

router.get('/', (req, res) => {
  Question
    .find()
    .then(questions => res.status(201).json(questions))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', });
    });
});

module.exports = { router, };
