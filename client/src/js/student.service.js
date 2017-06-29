(function() {
  'use strict';

  angular.module('primaticsLearning').factory('StudentService', StudentService);

  StudentService.$inject = ['$http'];

  function StudentService($http) {
    function createStudent(name, dob, phone) {
      if (!name || !dob || !phone || typeof(name) !== 'string' ||
          typeof(dob) !== 'string' || typeof(phone) !== 'string') {
        return Promise.reject('Invalid information provided');
      }

      return $http({
        url: '/api/primaticsLearning',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({
          name: name,
          dob: dob,
          phone: phone
        })
      })
      .then(function handleResponse(responseObj) {
        return(responseObj.data);
      });
    }

    return {};
  }

}());
