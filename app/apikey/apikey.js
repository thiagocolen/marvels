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
    vm.publicKey = 'f45e51d0865a78be501b79a8ffff43f8';

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