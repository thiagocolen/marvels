(function () {
  'use strict';

  angular
    .module('myApp.services', [])
    .service('Services', Services);

  Services.$inject = ['$http']

  function Services($http) {

    return {
      getCharacters: getCharacters
    };

    function getCharacters() {
      return $http.get('https://gateway.marvel.com/v1/public/characters?apikey=f45e51d0865a78be501b79a8ffff43f8')
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

})();