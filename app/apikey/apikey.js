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


  apikeyCtrl.$inject = ['$http', 'Services', '$location'];

  function apikeyCtrl($http, Services, $location) {
    var vm = this;
    vm.setKey = setKey;
    vm.getKey = getKey;
    vm.init = init;

    function init() {
      if(Services.getKey() !== null) {
        $location.url('/view1');
      }
    }

    function getKey() {
      return Services.getKey();
    }

    function setKey(publicKey) {    
      Services.setKey(publicKey);
      vm.init();
    }
  }


})();