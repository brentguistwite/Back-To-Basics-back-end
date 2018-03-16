const Algorithm = require('./spaced-rep-alg');
const LinkedList = require('./linked-list');
const questions = require('./../questions/questions');

const newList = new LinkedList();
const answer = 'color';
questions.forEach(question => newList.insertLast(question));

console.log('BEGINNING', newList);
const newAlg = new Algorithm(newList, answer);
newAlg.handler();
// console.log('********1****************', JSON.stringify(newAlg.data));
newAlg.handler();
// console.log('**************************************2', JSON.stringify(newAlg.data));
newAlg.handler();
// console.log('**************************************3', JSON.stringify(newAlg.data));
newAlg.handler();
console.log('**********************************4', JSON.stringify(newAlg.data));
newAlg.handler();
// console.log('**********************************5', JSON.stringify(newAlg.data));
newAlg.handler();
// console.log('************************************6', JSON.stringify(newAlg.data));


