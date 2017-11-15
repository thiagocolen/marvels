(function () {
  'use strict';

  angular.module('myApp.character', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/character/:id', {
        templateUrl: 'character/character.html',
        controller: 'CharacterCtrl',
        controllerAs: 'vm'
      });
    }])

    .controller('CharacterCtrl', CharacterCtrl);

  CharacterCtrl.$inject = ['$http', 'Services', '$location', '$routeParams'];

  function CharacterCtrl($http, Services, $location, $routeParams) {
    var vm = this;
    vm.init = init;
    vm.loadCharacter = loadCharacter;

    function init() {
      if (Services.getKey() === null ||
        Services.getKey() === undefined) {
        $location.url('/apikey');
      }

      loadCharacter($routeParams.id);
    }

    function loadCharacter(id) {

      Services.getCharacter(id)
        .then(function (response) {
          vm.publicKey = Services.getKey();
          vm.character = response.data.results[0];

          vm.character.series.items.forEach(function (element) {
            Services.getSeries(element.resourceURI)
              .then(function (serieResponse) {
                element.description = serieResponse.data.results[0].description;
                element.thumbnail = serieResponse.data.results[0].thumbnail.path + '.' + serieResponse.data.results[0].thumbnail.extension;
                element.startYear = serieResponse.data.results[0].startYear;
                element.endYear = serieResponse.data.results[0].endYear;

                element.characters = [];
                serieResponse.data.results[0].characters.items.forEach(function (characterElement) {
                  Services.getCharacterThumb(characterElement.resourceURI)
                    .then(function (characterThumbResponse) {
                      element.characters.push({
                        name: characterElement.name,
                        thumbnail: characterThumbResponse
                      });
                    });
                });

              });
          });
        });

    }

  }

})();