const algorithm = ( questionsList, userAnswer ) => {
  const { value, } = questionsList.head;
  // User answered corectly
  if ( userAnswer === value.answer ) {
    questionsList.doubleMemoryValue();
    questionsList.insertAt()
  }
};
