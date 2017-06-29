(function() {
  'use strict';

  angular.module('mean').controller('CrudController', CrudController);

  CrudController.$inject = ['CrudService'];

  /**
   * [CrudController constructor]
   * @param {Object} CrudService [AngularJS service that handles CRUD operations]
   */
  function CrudController(CrudService) {
    let crud = this;
    crud.calledCreateObject = 'false';

    crud.create = function create(createInput) {
      crud.calledCreateObject = 'true';
      console.log('createInput is: ', createInput);
      CrudService.createObject(createInput)
        .then(function handleResponseData(responseData) {
          console.log('result in trying to create new object: ', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to create new object: ', errResponse);
        });
    };

    crud.read = function read(readInput) {
      console.log('readInput is: ', readInput);
      CrudService.readObject(readInput)
        .then(function handleResponseData(responseData) {
          console.log('result in trying to read the object: ', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to read object: ', errResponse);
        });
    };

    crud.update = function update(oldValue, newValue) {
      console.log('update() called with: ', oldValue, newValue);
      CrudService.updateObject(oldValue, newValue)
        .then(function handleResponseData(responseData) {
          console.log('result in trying to update this object: ', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to update object: ', errResponse);
        });
    };

    crud.deleteObj = function deleteObj(deleteValue) {
      console.log('deleteObject called with: ', deleteValue);
      CrudService.deleteObject(deleteValue)
        .then(function handleResponseData(responseData) {
          console.log('result in trying to delete this object: ', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to delete object: ', errResponse);
        });
    };

  }

}());
