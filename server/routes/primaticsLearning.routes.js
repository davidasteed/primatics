const primaticsLearningRouter = require('express').Router();
const StudentObject = require('../models/Student.model.js');

primaticsLearningRouter.post('/',
  function createStudent(request, response, next) {
    if (!request.body || Object.keys(request.body).length === 0) {
      let err = new Error('You must provide data');
      err.status = 400;
      next(err);
      return;
    }
    console.log('createStudent() was called');

    StudentObject.find({name: request.body.name})
      .then(function checkIfObjectAlreadyExists(foundObject) {
        if (foundobject.length === 0) {
          let theObjectCreated = new Student(
            {
              name: request.body.name,
              dob: request.body.dob,
              phone: request.body.phone
            });
          console.log('New Student created:', theObjectCreated);
          theObjectCreated.save()
            .then(function sendBackTheResponse(data) {
              response.json(
                {message: 'Added a student', theObjectCreated: data});
            })
            .catch(function handleIssues(err) {
              console.error(err);
              let ourError = new Error('Unable add new student to database!');
              ourError.status = 500;
              next(ourError);
            });
        } else {
          response.json(
            {
              message: 'There is already a student with that data:',
              theObjectCreated: foundobject[0]
            });
        }
      });
  });

  module.exports = primaticsLearningRouter;
