const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// --------------Extract this into its own file if possible ----------
const questionSchema = new mongoose.Schema({
  category: { type: String, required: true, },
  content: { type: String, required: true, },
  answer: { type: String, required: true, },
});

const Question = mongoose.model('Question', questionSchema);
// -------------------------------------------------------------------

const UserSchema = new mongoose.Schema({
  firstName: { type: String, default: '', },
  lastName: { type: String, default: '', },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: [
    { // Provide a reference to the questions to avoid duplicates and improve scalability
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', },
      timesSeen: { type: Number, default: 0, },
      timesCorrect: { type: Number, default: 0, },
    },
  ],
});

UserSchema.methods.serialize = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    questions: this.questions,
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
  // Return password === this.password;
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, Question, };
