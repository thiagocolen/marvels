(function () {
  'use strict';

  angular.module('myApp.characters', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/characters', {
        templateUrl: 'characters/characters.html',
        controller: 'CharactersCtrl',
        controllerAs: 'vm'
      });
    }])

    .controller('CharactersCtrl', CharactersCtrl);


  CharactersCtrl.$inject = ['$http', 'Services', '$location'];

  function CharactersCtrl($http, Services, $location) {
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
          vm.page = response.data.offset + 1;
          vm.offset = response.data.offset;
          vm.characters = response.data.results;
        });

    }

  }

})();