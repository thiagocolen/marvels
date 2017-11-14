(function () {
  'use strict';

  angular.module('myApp.apikey', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/apikey', {
        templateUrl: 'apikey/apikey.html',
        controller: 'apikeyCtrl',
        controllerAs: 'vm'
      });
    }])

    .controller('apikeyCtrl', apikeyCtrl);


  apikeyCtrl.$inject = ['$http', 'Services'];

  function apikeyCtrl($http, Services) {
    var vm = this;
    vm.setKey = setKey;
    vm.getKey = getKey;

    Services.getCharacters()
      .then(function (response) {
        vm.characters = response.data.results;
      });

    function getKey() {
      console.log(Services.getKey());
      return Services.getKey();
    }

    function setKey(publicKey) {
      Services.setKey(publicKey);
    }
  }


})();