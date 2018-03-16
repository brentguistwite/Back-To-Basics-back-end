/**
 * @param  {Object} questionsList Linked list containing question related data
 * @param  {String} userAnswer Answer provided by client
 * @returns {Boolean} True if the answer was correct or false if incorrect
 */

const algorithm = (questionsList, userAnswer) => {
  const { answer, } = questionsList.head.value;
  let feedback = false;
  // User answered correctly
  if (userAnswer === answer) {
    questionsList.doubleMemValue();
    feedback = true;
  }
  // User answered incorrectly
  else {
    questionsList.resetMemValue();
  }
  questionsList.insertAt(questionsList.head, questionsList.head.value.memoryValue);
  return feedback;
};


module.exports = algorithm;
