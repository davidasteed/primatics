const primaticsLearningRouter = require('express').Router();
const Student = require('../models/Student.model.js');

primaticsLearningRouter.post('/',
  function createStudent(request, response, next) {
  if (!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide data');
    err.status = 400;
    next(err);
    return;
  }
  console.log('createStudent() was called');

  Student.find({name: request.body.name})
    .then(function checkIfObjectAlreadyExists(foundobject) {
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

primaticsLearningRouter.get('/:getStudents',
  function getStudents(request, response, next) {
    console.log('getStudents() called');
    Student.find({})
      .then(function sendBackTheResponse(data) {
        console.log('all students:', data);
        response.json(
          data);
      })
      .catch(function handleIssues(err) {
        console.error(err);
        let ourError = new Error('Unable search database!');
        ourError.status = 500;
        next(ourError);
      });
 });

primaticsLearningRouter.delete('/:name',
  function deleteStudent(request, response, next) {
  if (!request.params.name || request.params.name.length === 0) {
    let err = new Error('You must identify which student to delete');
    err.status = 400;
    next(err);
    return;
  }
  console.log('deleteStudent() was called on:', request.params.name);
  Student.findOneAndRemove(
    {name: request.params.name},
    function handleResponse(err, results) {
      if (err) return handleError(err);

      if (results) {
        console.log('findOneAndRemove deleted this record: ', results);
        response.json(
          {
            message: 'The following student was deleted: ',
            results
          }
        );
      }
      else {
        console.log('findOneAndRemove found no "results": ', results);
        response.json({message: 'No matching object found to delete'});
      }
    }
  );
});

module.exports = primaticsLearningRouter;
