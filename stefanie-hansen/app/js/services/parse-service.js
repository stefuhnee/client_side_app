'use strict';

module.exports = function(app) {
  app.factory('ParseService', function($http) {
    const service = {};
    service.plants = [];
    service.supplements = [];

    service.constructResource = function() {
      return function(addedResource) {
        let added = addedResource.data;
        for (let key in added) {
          if (key === 'zone') added[key] = parseInt(added[key]);
          added[key] = Array.isArray(added[key]) && added[key].length > 1 ? added[key].split(',') : added[key];
        }
        if (added.commonName) service.plants.push(added);
        if (added.name) service.supplements.push(added);
        console.log('added', added);
        service.update();
        return added;
      };
    };

    function fetchPlants() {
      $http.get('http://localhost:3000/plants')
      .then((res) => {
        service.plants = res.data;
        console.log('res data from fetch palnts', res.data);
        return service.plants;
      }, (err) => {
        console.log(err);
      });
    }

    function fetchSupplements() {
      $http.get('http://localhost:3000/supplements')
      .then((res) => {
        service.supplements = res.data;
        return service.supplements;
      }, (err) => {
        console.log(err);
      });
    }

    service.update = function() {
      console.log('attempting to update');
      fetchSupplements();
      fetchPlants();
    };

    return service;
  });
};
