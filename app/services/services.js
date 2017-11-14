(function () {
  'use strict';

  angular
    .module('myApp.services', [])
    .service('Services', Services);

  Services.$inject = ['$http']

  function Services($http) {
    var vm = this; 
    vm.appkey = null;

    return {
      getCharacters: getCharacters,
      setKey: setKey,
      getKey: getKey
    };

    function getCharacters() {
      //api-key f45e51d0865a78be501b79a8ffff43f8
      return $http.get('https://gateway.marvel.com/v1/public/characters?apikey=' + vm.appkey)
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function setKey (key) {
      vm.appkey = key;
    }

    function getKey () {
      return vm.appkey;
    }

  }

})();