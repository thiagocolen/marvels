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


  View1Ctrl.$inject = ['$http', 'Services', '$location'];

  function View1Ctrl($http, Services, $location) {
    var vm = this;
    vm.init = init;
    vm.loadPage = loadPage;

    function init() {
      if (Services.getKey() === null ||
        Services.getKey() === undefined) {
        $location.url('/apikey');
      }

      loadPage();
    }

    function loadPage(offset) {
      if (!offset) {
        offset = 0;
      }

      Services.getCharacters(offset)
        .then(function (response) {
          console.log('response:', response);
          vm.offset = response.data.offset;
          vm.characters = response.data.results;
        });

    }

  }

})();