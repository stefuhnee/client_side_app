'use strict';

module.exports = function(app) {
  app.controller('PlantsController', ['$http', PlantsController]);
};

function PlantsController($http) {
  this.plants = [];
  this.$http = $http;

  this.getPlants = function($scope) {
    $http.get('http://localhost:3000/plants')
    .then((res) => {
      $scope.mode = 'list';
      this.plants = res.data;
    }, (err) => {
      console.log(err);
    }).bind(this);
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

    this.deletePlant = function(plant) {
      $http.delete(`http://localhost:3000/plants/${plant._id}`)
      .then(() => {
        this.plants.splice(this.plants.indexOf(plant), 1);
      }, (err) => {
        console.log(err);
      }).bind(this);
    };

    this.updatePlant = function(plant, updatedPlant) {
      if (updatedPlant.commonName) plant.commonName = updatedPlant.commonName;
      if (updatedPlant.scientificName) plant.scientificName = updatedPlant.scientificName;
      if (updatedPlant.medicinalUses) plant.medicinalUses = updatedPlant.medicinalUses.split(',') || updatedPlant.medicinalUses;
      if (updatedPlant.nutritionalValue) plant.nutritionalValue = updatedPlant.nutritionalValue.split(',') || updatedPlant.nutritionalValue;
      if (updatedPlant.zone) plant.zone = updatedPlant.zone;
      $http.put('http://localhost:3000/plants', plant)
        .then(() => {
          this.plants = this.plants.map(p => {
            return p._id === plant._id ? plant : p;
          });
        }, (err) => {
          console.log(err);
        }).bind(this);
}
//
// PlantsController.prototype.getPlants = function($scope) {
//   this.$http.get('http://localhost:3000/plants')
//   .then((res) => {
//     $scope.mode = 'list';
//     this.plants = res.data;
//   }, (err) => {
//     console.log(err);
//   }).bind(this);
// };

// PlantsController.prototype.addPlant = function() {
//   this.$http.post('http://localhost:3000/plants', this.newPlant)
//   .then((res) => {
//     let medicinalUsesArray = res.data.medicinalUses[0].split(',') || res.data.medicinalUses[0];
//     res.data.medicinalUses = medicinalUsesArray;
//     let nutritionalValueArray = res.data.nutritionalValue[0].split(',') || res.data.nutritionalValue[0];
//     res.data.nutritionalValue = nutritionalValueArray;
//     this.plants.push(res.data);
//     this.newPlant = null;
//   }, (err) => {
//     console.log(err);
//   }).bind(this);
// };

PlantsController.prototype.deletePlant = function(plant) {
  this.$http.delete(`http://localhost:3000/plants/${plant._id}`)
  .then(() => {
    this.plants.splice(this.plants.indexOf(plant), 1);
  }, (err) => {
    console.log(err);
  }).bind(this);
};

PlantsController.prototype.updatePlant = function(plant, updatedPlant) {
  if (updatedPlant.commonName) plant.commonName = updatedPlant.commonName;
  if (updatedPlant.scientificName) plant.scientificName = updatedPlant.scientificName;
  if (updatedPlant.medicinalUses) plant.medicinalUses = updatedPlant.medicinalUses.split(',') || updatedPlant.medicinalUses;
  if (updatedPlant.nutritionalValue) plant.nutritionalValue = updatedPlant.nutritionalValue.split(',') || updatedPlant.nutritionalValue;
  if (updatedPlant.zone) plant.zone = updatedPlant.zone;
  this.$http.put('http://localhost:3000/plants', plant)
    .then(() => {
      this.plants = this.plants.map(p => {
        return p._id === plant._id ? plant : p;
      });
    }, (err) => {
      console.log(err);
    }).bind(this); //bind sets the this value to the original value. it changes when we pass off these methods as properties on the directive scope. MOVE OFF OF PROTOTYPE INTO CONTROLLER. bind(this), make all methods this.stuff and th
};
