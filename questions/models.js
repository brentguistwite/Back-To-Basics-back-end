const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true, },
  content: { type: String, required: true, },
  answer: { type: String, required: true, },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question, };
