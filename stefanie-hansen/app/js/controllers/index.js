'use strict';

module.exports = function(app) {
  app.controller('ResourceController', ['$http', ResourceController]);
};

function ResourceController($http) {
  this.supplements = [];
  this.plants = [];
  this.$http = $http;
  this.mode = 'list';
  this.editing = false;
  this.currentresource;
  this.updated = {};

  this.toggleItem = function(resource) {
    if (resource) this.currentresource = resource;
    this.mode === 'list' ? this.mode = 'item' : this.mode = 'list';
  }.bind(this);

  this.init = function() {
    this.getSupplements();
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
    this.updated.zone = parseInt(this.updated.zone);
    $http.post('http://localhost:3000/plants', this.updated)
    .then((res) => {
      let medicinalUsesArray = res.data.medicinalUses[0].split(',') || res.data.medicinalUses[0];
      res.data.medicinalUses = medicinalUsesArray;
      let nutritionalValueArray = res.data.nutritionalValue[0].split(',') || res.data.nutritionalValue[0];
      res.data.nutritionalValue = nutritionalValueArray;
      this.plants.push(res.data);
      this.updated = {};
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.deletePlant = function(plant) {
    $http.delete(`http://localhost:3000/plants/${plant._id}`)
    .then(() => {
      this.plants.splice(this.plants.indexOf(plant), 1);
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.updatePlant = function(updated) {
    if (updated.commonName) this.currentresource.commonName = updated.commonName;
    if (updated.scientificName) this.currentresource.scientificName = updated.scientificName;
    if (updated.medicinalUses) this.currentresource.medicinalUses = updated.medicinalUses.split(',') || updated.medicinalUses;
    if (updated.nutritionalValue) this.currentresource.nutritionalValue = updated.nutritionalValue.split(',') || updated.nutritionalValue;
    if (updated.zone) this.currentresource.zone = parseInt(updated.zone);
    $http.put('http://localhost:3000/plants', this.currentresource)
      .then(() => {
        this.plants = this.plants.map(p => {
          return p._id === this.currentresource._id ? this.currentresource : p;
        });
      }, (err) => {
        console.log(err);
      });
    this.updated = {};
  }.bind(this);

  this.getSupplements = function() {
    $http.get('http://localhost:3000/supplements')
    .then((res) => {
      this.supplements = res.data;
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.addSupplement = function() {
    $http.post('http://localhost:3000/supplements', this.updated)
    .then((res) => {
      let medicinalEffectsArray = res.data.medicinalEffects[0].split(',') || res.data.medicinalEffects[0];
      res.data.medicinalEffects = medicinalEffectsArray;
      let sideEffectsArray = res.data.sideEffects[0].split(',') || res.data.sideEffects[0];
      res.data.sideEffects = sideEffectsArray;
      this.supplements.push(res.data);
      this.updated = {};
    }, (err) => {
      console.log(err);
    });
    this.updated = {};
  }.bind(this);

  this.deleteSupplement = function(supplement) {
    $http.delete(`http://localhost:3000/supplements/${supplement._id}`)
    .then(() => {
      this.supplements.splice(this.supplements.indexOf(supplement), 1);
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.updateSupplement = function(updated) {
    if (updated.name) this.currentresource.name = updated.name;
    if (updated.medicinalEffects) this.currentresource.medicinalEffects = updated.medicinalEffects.split(',') || updated.medicinalEffects;
    if (updated.sideEffects) this.currentresource.sideEffects = updated.sideEffects.split(',') || updated.sideEffects;
    $http.put('http://localhost:3000/supplements', this.currentresource)
      .then(() => {
        this.supplements = this.supplements.map(s => {
          return s._id === this.currentresource._id ? this.currentresource : s;
        });
        this.updated = {};
      }, (err) => {
        console.log(err);
      });
  }.bind(this);
}
