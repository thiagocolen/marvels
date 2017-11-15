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
    vm.pageLimit = 10;

    return {
      getCharacters: getCharacters,
      getCharacter: getCharacter,
      getCharacterThumb: getCharacterThumb,
      getSeries: getSeries,
      setKey: setKey,
      getKey: getKey
    };


    function getCharacterThumb(characterUrl) {
      var url = characterUrl +
        '?apikey=' + vm.appkey;

      return $http.get(url)
        .then(function (response) {
          var imgUrl =
            response.data.data.results[0].thumbnail.path + 
            '.' +
            response.data.data.results[0].thumbnail.extension;
          return imgUrl;
        })
        .catch(function (err) {
          console.log(err);
        });

    }

    function getSeries(serieUrl) {
      var url = serieUrl +
        '?apikey=' + vm.appkey;

      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });

    }


    function getCharacter(id) {
      var url = vm.marvelUrl +
        'characters/' + id +
        '?apikey=' + vm.appkey;

      return $http.get(url)
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getCharacters(offset) {
      var url = vm.marvelUrl +
        '/characters' +
        '?apikey=' + vm.appkey +
        '&offset=' + (offset) +
        '&limit=' + vm.pageLimit;

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