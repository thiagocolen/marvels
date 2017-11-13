(function () {
  'use strict';

  angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        controllerAs: 'vm'
      });
    }])

    .controller('View1Ctrl', View1Ctrl);


  View1Ctrl.$inject = ['$http', 'Services'];

  function View1Ctrl($http, Services) {
    var vm = this;

    Services.getCharacters()
      .then(function (response) {
        vm.characters = response.data.results;
      });

  }


})();