(function() {
  'use strict';

  angular.module('primaticsLearning')
    .controller('StudentController', StudentController);

  StudentController.$inject = ['StudentService'];

  function StudentController(StudentService) {
    let student = this;
    student.calledCreateStudent = 'false';

    student.create = function create(name, dob, phone) {
      student.calledCreateStudent = 'true';
      console.log('new student input is: ', name, dob, phone);
      StudentService.createStudent(name, dob, phone)
        .then(function handleResponseData(responseData) {
          console.log('Result in trying to create new student:', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to create new object: ', errResponse);
        });
    };
  }

}());
