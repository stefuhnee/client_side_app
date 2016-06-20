'use strict';

module.exports = function(app) {
  app.controller('SupplementsController', ['$http', SupplementsController]);
};

function SupplementsController($http) {
  this.supplements = [];
  this.$http = $http;
}

SupplementsController.prototype.getSupplements = function() {
  this.$http.get('http://localhost:3000/supplements')
  .then((res) => {
    this.supplements = res.data;
  }, (err) => {
    console.log(err);
  });
};

SupplementsController.prototype.addSupplement = function() {
  this.$http.post('http://localhost:3000/supplements', this.newSupplement)
  .then((res) => {
    let medicinalEffectsArray = res.data.medicinalEffects[0].split(',');
    res.data.medicinalEffects = medicinalEffectsArray;
    let sideEffectsArray = res.data.sideEffects[0].split(',');
    res.data.sideEffects = sideEffectsArray;
    this.supplements.push(res.data);
    this.newSupplement = null;
  }, (err) => {
    console.log(err);
  });
};

SupplementsController.prototype.deleteSupplement = function(plant) {
  this.$http.delete(`http://localhost:3000/supplements/${plant._id}`)
  .then(() => {
    this.supplements.splice(this.supplements.indexOf(plant), 1);
  }, (err) => {
    console.log(err);
  });
};

SupplementsController.prototype.updateSupplement = function(plant, updatedSupplement) {
  this.$http.put('http://localhost:3000/supplements/', this._id)
    .then(() => {
      let existingSupplement = this.supplements[this.supplements.indexOf(plant)];
      existingSupplement.name = updatedSupplement.name;
      existingSupplement.medicinalEffects = updatedSupplement.medicinalEffects.split(',');
      existingSupplement.sideEffects = updatedSupplement.sideEffects.split(',');
      updatedSupplement = null;
    }, (err) => {
      console.log(err);
    });
};
