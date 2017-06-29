const primaticsLearningRouter = require('express').Router();
const Student = require('../models/student.model.js');

primaticsLearningRouter.post('/',
  function createStudent(request, response, next) {
    if (!request.body || Object.keys(request.body).length === 0) {
      let err = new Error('You must provide data');
      err.status = 400;
      next(err);
      return;
    }
    console.log('createStudent() was called');
  });
