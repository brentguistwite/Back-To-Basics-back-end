const LinkedList = require('./linked-list');

// Our base set of questions/answers with default values
const data = require('./../questions/questions');
const baseList = new LinkedList();
data.forEach(item => baseList.insertLast(item));
console.log('----------BEFORE----------', baseList.display());
baseList.doubleMemoryValue();
baseList.insertAt(baseList.head, baseList.head.value.memoryValue);
console.log('----------AFTER----------', baseList.display());

const algorithm = ( questionsList, userAnswer ) => {
  const { head, } = questionsList;
  // User answered corectly
  if ( userAnswer === head.value.answer ) {
    questionsList.doubleMemoryValue();
    head.value.timesCorrect ++;
    questionsList.insertAt(head.value.memoryValue);
  }
  // User answered incorrectly
  else {
    questionsList.resetMemoryValue();
    questionsList.insertAt(questionsList.head, head.value.memoryValue);
  }
  head.value.timesSeen ++;
};


