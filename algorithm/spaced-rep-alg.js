const LinkedList = require('./linked-list');

// Our base set of questions/answers with default values
const data = require('./../questions/questions');
const baseList = new LinkedList();
data.forEach(item => baseList.insertLast(item));

// If mem val > list size set to list size
const algorithm = ( questionsList, userAnswer ) => {
  const { head, } = questionsList;
  // User answered corectly
  if ( userAnswer === head.value.answer ) {
    questionsList.head.value.memoryValue *= 2;
    head.value.timesCorrect ++;
    questionsList.insertAt( questionsList.head, head.value.memoryValue );
  }
  // User answered incorrectly
  else {
    questionsList.head.value.memoryValue = 1;
    questionsList.insertAt( questionsList.head, head.value.memoryValue );
  }
  head.value.timesSeen ++;
};
// console.log('----------BEFORE----------', baseList.display());
// algorithm ( baseList, 'color' );
// console.log('----------AFTER----------', baseList.display());
// algorithm ( baseList, 'unshift' );
// console.log('----------AFTER AGAIN----------', baseList.display());
// algorithm(baseList, 'color');
// console.log('----------AFTER FINALLY----------', baseList.display());
console.log(baseList.peek());

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
