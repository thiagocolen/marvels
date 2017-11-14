(function () {
  'use strict';

  angular
    .module('myApp.services', [])
    .service('Services', Services);

  Services.$inject = ['$http']

  function Services($http) {
    var vm = this;
    vm.appkey = null;
    vm.marvelUrl = 'https://gateway.marvel.com/v1/public/';

    return {
      getCharacters: getCharacters,
      setKey: setKey,
      getKey: getKey
    };


    function getCharacters(offset) {
      var url = vm.marvelUrl + '/characters?apikey=' + vm.appkey + '&offset=' + offset;
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function setKey(key) {
      vm.appkey = key;
    }

    function getKey() {
      return vm.appkey;
    }

  }

})();