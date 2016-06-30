'use strict';

module.exports = function(app) {
  app.controller('PlantsController', ['$scope', '$http', PlantsController]);
};

function PlantsController($http, $scope) {
  this.plants = [{commonName: 'Foxglove', scientificName: 'Digitalis', medicinalEffects: ['relieves edema', 'relieves asthma', 'relieves epilepsy'], nutritionalValue: ['none'], zone: 5}];
  this.$http = $http;
  $scope.mode = 'list';

  this.init = function() {
    this.getPlants();
  };

  this.getPlants = function() {
    $http.get('http://localhost:3000/plants')
    .then((res) => {
      this.plants = res.data;
    }, (err) => {
      console.log(err);
    });
  };

  this.addPlant = function() {
    $http.post('http://localhost:3000/plants', this.newPlant)
    .then((res) => {
      console.log(res);
      let medicinalUsesArray = res.data.medicinalUses[0].split(',') || res.data.medicinalUses[0];
      res.data.medicinalUses = medicinalUsesArray;
      let nutritionalValueArray = res.data.nutritionalValue[0].split(',') || res.data.nutritionalValue[0];
      res.data.nutritionalValue = nutritionalValueArray;
      this.plants.push(res.data);
      this.newPlant = null;
    }, (err) => {
      console.log(err);
    }).bind(this);
  };

  this.deletePlant = function(plant) {
    $http.delete(`http://localhost:3000/plants/${plant._id}`)
    .then(() => {
      this.plants.splice(this.plants.indexOf(plant), 1);
    }, (err) => {
      console.log(err);
    }).bind(this);
  };

  this.updatePlant = function(plant) {
    plant.medicinalUses = plant.medicinalUses.split(',') || plant.medicinalUses;
    plant.nutritionalValue = plant.nutritionalValue.split(',') || plant.nutritionalValue;
    $http.put('http://localhost:3000/plants', plant)
      .then(() => {
        this.plants = this.plants.map(p => {
          return p._id === plant._id ? plant : p;
        });
      }, (err) => {
        console.log(err);
      }).bind(this);
  };
}
