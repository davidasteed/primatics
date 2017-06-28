(function() {
  'use strict';

  angular.module('mean').factory('CrudService', CrudService);

  CrudService.$inject = ['$http'];

  function CrudService($http) {
    function createObject(input) {
      if (!input) {
        return Promise.reject('Invalid information');
      }
      if (typeof(input) !== 'string') {
        return Promise.reject('Invalid inforation');
      }
      return $http({
        url: '/api/crudobject',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({
          objectName: input
        })
    })
    .then(function handleResponse(responseObj) {
      newObject = responseObj.data.newObject.objectName;
      return(responseObj.data);
    });
  }

    return {
      createObject: createObject
    };
  }

}());
