# Spaced repetition server

Given a list of questions with corresponding "memory values", M, starting at 1:
Take the first question in the list
Ask the question
If the answer was correct:
Double the value of M
If the answer was wrong:
Reset M to 1
Move the question back M places in the list
You can use a singly linked list to do this




Backend
The backend of the app plays three key roles. The first is authentication. To allow users to authenticate, the backend should use the JWT. To protect the endpoints you should use Local Strategy.

The second role is to integrate the spaced repetition algorithm into your app. It should have an endpoint for the frontend to fetch the next question from, and an endpoint for the frontend to record what the user's response was.

The third role is to store the users' progress in a MongoDB database. This should include both the number of questions which they have answered correctly, plus any information about their answer history that your spaced repetition algorithm needs in order to generate a new sequence of words to test the user.

Requirements
Technologies: Node.js, Express, MongoDB, Passport, JWT
Allow users to register/login using JWT authentication
Use the spaced repetition algorithm to generate the next word pair
Pairs of words should be stored in a Mongo database
This should be a fixed array of questions for an MVP
Store the number of questions which users have answered correctly in the database
Store whatever information is needed for the algorithm about the user's answer history in the database