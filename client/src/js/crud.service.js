(function() {
  'use strict';

  angular.module('mean').factory('CrudService', CrudService);

  CrudService.$inject = ['$http'];

  function CrudService($http) {
    function createObject(input) {
      if (!input || typeof(input) !== 'string') {
        return Promise.reject('Invalid information');
      }

      return $http({
        url: '/api/crudobject',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({
          crudObjectName: input
        })
      })
      .then(function handleResponse(responseObj) {
        // newObject = responseObj.data.theObjectCreated;
        return(responseObj.data);
      });
    }

    function readObject(input) {
      if (!input || typeof(input) !== 'string') {
        return Promise.reject('Invalid information');
      }

      return $http({
        url: '/api/crudobject' + '/' + input,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(responseObj) {
        return(responseObj.data);
      });
    }

    function updateObject(oldValue, newValue) {
      if (!oldValue || !newValue) {
        return Promise.reject('Invalid information');
      }
      if (typeof(oldValue) !== 'string' || typeof(newValue) !== 'string') {
        return Promise.reject('Invalid information');
      }
      return $http({
        url: '/api/crudobject',
        method: 'patch',
        headers: {
          'Content-Type': 'application/json'
        },
        data:
          angular.toJson({
            oldValue: oldValue,
            newValue: newValue
          })
      })
      .then(function handleResponse(responseObj) {
        console.log('responseObj.data contains: ', responseObj);
        return(responseObj.data);
      });
    }

    function deleteObject(deleteValue) {
      if (!deleteValue || typeof(deleteValue) !== 'string') {
        return Promise.reject('Invalid information');
      }
      return $http({
        url: '/api/crudobject' + '/' + deleteValue,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(responseObj) {
        return(responseObj.data);
      });
    }

    return {
      createObject: createObject,
      readObject: readObject,
      updateObject: updateObject,
      deleteObject: deleteObject
    };
  }

}());
