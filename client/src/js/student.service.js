(function() {
  'use strict';

  angular.module('primaticsLearning').factory('StudentService', StudentService);

  StudentService.$inject = ['$http'];

  function StudentService($http) {

    let studentList = getStudents();

    getStudents()
    .then(function handleResponse(responseObj) {
      console.log('StudentService returned a list of students:', responseObj);
      return responseObj;
    });

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

    function getStudents() {
      return $http({
        url: '/api/primaticsLearning' + '/' + 'getStudents',
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(responseObj) {
        return(responseObj.data);
      });
    }

    function listStudents() {
      return studentList;
    }

    function deleteStudent(name) {
      if (!name || typeof(name) !== 'string') {
        return Promise.reject('Invalid name provided');
      }

      return $http({
        url: '/api/primaticsLearning' + '/' + name,
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
      createStudent: createStudent,
      getStudents: getStudents,
      listStudents: listStudents,
      deleteStudent: deleteStudent
    };
  }

}());
