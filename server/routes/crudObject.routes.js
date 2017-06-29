const crudObjectRouter = require('express').Router();
const CrudObject = require('../models/CrudObject.model.js');

crudObjectRouter.post('/', function createCrudObject(request, response, next) {
  if(!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide an object');
    err.status = 400;
    next(err);
    return;
  }
  console.log('createCrudObject() was called');

  CrudObject.find({crudObjectName: request.body.crudObjectName})
    .then(function checkIfObjectAlreadyExists(foundobject) {
      if(foundobject.length === 0) {
        let theObjectCreated = new CrudObject({
          crudObjectName: request.body.crudObjectName
        });
        console.log('The new CrudObject created:', theObjectCreated);
        theObjectCreated.save()
          .then(function sendBackTheResponse(data) {
            response.json({ message: 'Added a crudobject', theObjectCreated: data});
          })
          .catch(function handleIssues(err) {
            console.error(err);
            let ourError = new Error('Unable to save new player to database!');
            ourError.status = 500;
            next(ourError);
          });
      } else {
        response.json(
          {
            message: 'There is already a crudObject with that name:',
            theObjectCreated: foundobject[0]
          });
      }
    })
    .catch(function handleErrors(err) {
      console.error(err);
      let ourError = new Error('Unable to execute find for crudObject!');
      ourError.status = 500;
      next(ourError);
    });
});

crudObjectRouter
  .get('/:crudObjectName', function readCrudObject(request, response, next) {
  if(!request.params.crudObjectName) {
    let err = new Error('You must provide an object to search for!');
    err.status = 400;
    next(err);
    return;
  }
  console.log('readCrudObject() was called');

  CrudObject.find({crudObjectName: request.params.crudObjectName})
    .then(function checkIfObjectAlreadyExists(foundobject) {
      if(foundobject.length > 0) {
        console.log('This object was found in database: ', foundobject);
        response.json({
          message: 'This object was found in database: ',
          theObjectFound: foundobject[0]
        });
      } else {
        response.json(
          {message: 'We could not find a matching object in database:'});
      }
    })
    .catch(function handleIssues(err) {
      console.error(err);
      let ourError = new Error('Unable to search database for object!');
      ourError.status = 500;
      next(ourError);
    });
});

crudObjectRouter.patch('/', function updateCrudObject(request, response, next) {
  if(!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide an object');
    err.status = 400;
    next(err);
    return;
  }
  if(!request.body.oldValue || request.body.oldValue.length === 0 ||
    typeof(request.body.oldValue) !== 'string') {
    let err = new Error('You must provide an old value');
    err.status = 400;
    next(err);
    return;
  }
  if(!request.body.newValue || request.body.newValue.length === 0 ||
    typeof(request.body.newValue) !== 'string') {
    let err = new Error('You must provide a new value');
    err.status = 400;
    next(err);
    return;
  }
  console.log('updateCrudObject() was called with: ',
              request.body.oldValue, request.body.newValue);

  CrudObject.findOneAndUpdate(
    {crudObjectName: request.body.oldValue},
    {crudObjectName: request.body.newValue},
    function handleResponse(err, results) {
      if (err) return handleError(err);

      if (results) {
        console.log('findOneAndUpdate updated this record: ', results);
        response.json(
          {
           message: 'The following object was updated:',
           results
          }
        );
      }
      else {
        console.log('findOneAndUpdate found no "results": ', results);
        response.json({message: 'No matching object found in database'});
      }
    }
  );
});

crudObjectRouter.delete('/:crudObjectName',
  function deleteCrudObject(request, response, next) {
    console.log('request.params contains: ', request.params);
    if (!request.params.crudObjectName ||
      request.params.crudObjectName.length === 0) {
      let err = new Error('You must identify which object to delete');
      err.status = 400;
      next(err);
      return;
    }
    console.log('delete was called on: ', request.params.crudObjectName);
    CrudObject.findOneAndRemove(
      {crudObjectName: request.params.crudObjectName},
      function handleResponse(err, results) {
        if (err) return handleError(err);

        if (results) {
          console.log('findOneAndRemove deleted this record: ', results);
          response.json(
            {
              message: 'The following object was deleted:',
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

// function findObject(oldValue) {
//   return CrudObject.find({crudObjectName: oldValue})
//   .then(function readObject(data) {
//     if(!data) {
//       let err = new Error('Cannot find existing object with that name!');
//       err.status = 404;
//       return next(err);
//     }
//     return data[0]._id;
//   })
//   .catch(function handleIssues(err) {
//     console.error(err);
//     let ourError = new Error('Unable to search for that object');
//     ourError.status = 500;
//     throw ourError;
//   });
// }

module.exports = crudObjectRouter;
