/**
 * @param  {Object} questionsList Linked list containing question related data
 * @param  {String} userAnswer Answer provided by client
 * @returns {Boolean} True if the answer was correct or false if incorrect
 */

const algorithm = (questionsList, userAnswer) => {
  let { answer, } = questionsList.head.value; // eslint-disable-line
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

/*

User signs up

user is assigned base set of questions all with memory value of 0.5

present user with the first question(head), timesSeen count and timesCorrect count

on submit compare users answer to correct answer

IF correct
    double memory value
    increment times seen by 1 AND times correct by 1
    move current node back n spaces in the list

ELSE(incorrect)
    memory value = 1
    increment times seen by 1
    move current node back n spaces in the list

present user with new first question(head)

LL = {
    head: {
        value: {
            question: 'how many ....?',
            answer: '3',

        }
    }
    next: {

    }
}

*/
