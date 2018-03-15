const LinkedList = require('./linked-list');

// Our base set of questions/answers with default values
const data = require('./../questions/questions');
const baseList = new LinkedList();
data.forEach(item => baseList.insertLast(item));

const algorithm = ( questionsList, userAnswer ) => {
  const { head, } = questionsList;
  // User answered corectly
  if ( userAnswer === head.value.answer ) {
    questionsList.doubleMemoryValue();
    head.value.timesCorrect ++;
    questionsList.insertAt( questionsList.head, head.value.memoryValue );
  }
  // User answered incorrectly
  else {
    questionsList.resetMemoryValue();
    questionsList.insertAt( questionsList.head, head.value.memoryValue );
  }
  head.value.timesSeen ++;
};
console.log('----------BEFORE----------', baseList.display());
algorithm ( baseList, 'color' );
console.log('----------AFTER----------', baseList.display());
algorithm ( baseList, 'unshift' );
console.log('----------AFTER AGAIN----------', baseList.display());
algorithm(baseList, 'color');
console.log('----------AFTER FINALLY----------', baseList.display());

module.exports = algorithm;
