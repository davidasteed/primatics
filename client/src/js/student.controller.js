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
      console.log('debug: studentList contains: ', student.studentList);
      StudentService.createStudent(name, dob, phone)
        .then(function handleResponse(responseObj) {
          console.log('Result in trying to create new student:', responseObj);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to create new object: ', errResponse);
        });
    };

    student.listStudents = function listStudents() {
      StudentService.listStudents()
        .then(function handleResponse(responseObj) {
          student.studentList = responseObj;
          return responseObj;
        });
    };

    student.studentList = student.listStudents() || [];

    student.deleteStudent = function deleteStudent(name) {
      console.log('deleteStudent() was called with: ', name);
      StudentService.deleteStudent(name)
        .then(function handleResponse(responseObj) {
          console.log('Result in trying to deleteStudent:', responseObj);
        })
        .catch(function handleErrors(errResponse) {
          console.log('Error trying to create new object: ', errResponse);
        });
    };
  }

}());
