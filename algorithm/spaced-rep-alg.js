const LinkedList = require('./linked-list');

// Our base set of questions/answers with default values
const data = require('./../questions/questions');
const baseList = new LinkedList();
data.forEach(item => baseList.insertLast(item));

/**
 * @param  {} list - Linked list of questions
 * @param  {} bool - True or False representing a correct or incorrect answer
 */






// If answer is wrong reset value to 1



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


*/
