'use strict';

module.exports = function(app) {
  app.controller('ResourceController', ['$http', '$scope', ResourceController]);
};

function ResourceController($http, $scope) {
  this.supplements = [];
  this.plants = [];
  this.$http = $http;
  this.$scope = $scope;

  this.toggleItem = function($scope) {
    console.log('toggling');
    console.log('scope', $scope);
    $scope.mode === 'list' ? $scope.mode === 'item' : $scope.mode === 'list';
  };

  this.init = function($scope) {
    this.getSupplements();
    this.getPlants();
    $scope.mode = 'list';
    console.log($scope);
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

  this.updatePlant = function(plant, updated) {
    if (updated.commonName) plant.commonName = updated.commonName;
    if (updated.scientificName) plant.scientificName = updated.scientificName;
    if (updated.medicinalUses) plant.medicinalUses = updated.medicinalUses.split(',') || updated.medicinalUses;
    if (updated.nutritionalValue) plant.nutritionalValue = updated.nutritionalValue.split(',') || updated.nutritionalValue;
    if (updated.zone) plant.zone = updated.zone;
    $http.put('http://localhost:3000/plants', plant)
      .then(() => {
        this.plants = this.plants.map(p => {
          return p._id === plant._id ? plant : p;
        });
      }, (err) => {
        console.log(err);
      }).bind(this);
  };

  this.getSupplements = function() {
    $http.get('http://localhost:3000/supplements')
    .then((res) => {
      this.supplements = res.data;
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.addSupplement = function() {
    $http.post('http://localhost:3000/supplements', this.newSupplement)
    .then((res) => {
      console.log(res);
      let medicinalEffectsArray = res.data.medicinalEffects[0].split(',') || res.data.medicinalEffects[0];
      res.data.medicinalEffects = medicinalEffectsArray;
      let sideEffectsArray = res.data.sideEffects[0].split(',') || res.data.sideEffects[0];
      res.data.sideEffects = sideEffectsArray;
      this.supplements.push(res.data);
      this.newSupplement = null;
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.deleteSupplement = function(supplement) {
    $http.delete(`http://localhost:3000/supplements/${supplement._id}`)
    .then(() => {
      this.supplements.splice(this.supplements.indexOf(supplement), 1);
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.updateSupplement = function(supplement, updated) {
    if (updated.name) supplement.name = updated.name;
    if (updated.medicinalEffects) supplement.medicinalEffects = updated.medicinalEffects.split(',') || updated.medicinalEffects;
    if (updated.sideEffects) supplement.sideEffects = updated.sideEffects.split(',') || updated.sideEffects;
    $http.put('http://localhost:3000/supplements', supplement)
      .then(() => {
        this.supplements = this.supplements.map(s => {
          return s._id === supplement._id ? supplement : s;
        });
      }, (err) => {
        console.log(err);
      });
  }.bind(this);
}
