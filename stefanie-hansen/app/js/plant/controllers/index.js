'use strict';

module.exports = function(app) {
  app.controller('PlantsController', ['$http', PlantsController]);
};

function PlantsController($http) {
  this.plants = [];
  this.$http = $http;
}

PlantsController.prototype.getPlants = function() {
  this.$http.get('http://localhost:3000/plants')
  .then((res) => {
    this.plants = res.data;
  }, (err) => {
    console.log(err);
  });
};

PlantsController.prototype.addPlant = function() {
  this.$http.post('http://localhost:3000/plants', this.newPlant)
  .then((res) => {
    let medicinalUsesArray = res.data.medicinalUses[0].split(',') || res.data.medicinalUses[0];
    res.data.medicinalUses = medicinalUsesArray;
    let nutritionalValueArray = res.data.nutritionalValue[0].split(',') || res.data.nutritionalValue[0];
    res.data.nutritionalValue = nutritionalValueArray;
    this.plants.push(res.data);
    this.newPlant = null;
  }, (err) => {
    console.log(err);
  });
};

PlantsController.prototype.deletePlant = function(plant) {
  this.$http.delete(`http://localhost:3000/plants/${plant._id}`)
  .then(() => {
    this.plants.splice(this.plants.indexOf(plant), 1);
  }, (err) => {
    console.log(err);
  });
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
    });
};
