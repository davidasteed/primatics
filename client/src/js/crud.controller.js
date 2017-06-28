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

    crud.create = function create(inputObject) {
      crud.calledCreateObject = 'true';
      console.log('inputUser is: ', inputObject);
      CrudService.createObject(inputObject);
    };
  }

}());
