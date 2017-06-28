const crudObjectRouter = require('express').Router();
const CrudObject = require('../models/CrudObject.model.js');

function createCrudObject(request, response, next) {
  if(!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide an object');
    err.status = 400;
    next(err);
    return;
  }
  console.log('createCrudObject() was called');
}

crudObjectRouter.post('/', createCrudObject);
module.exports = crudObjectRouter;
