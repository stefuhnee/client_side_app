'use strict';

module.exports = function(app) {
  app.controller('SupplementsController', ['$http', SupplementsController]);
};

function SupplementsController($http) {
  this.supplements = [];
  this.$http = $http;

  this.getSupplements = function($scope) {
    $http.get('http://localhost:3000/supplements')
    .then((res) => {
      $scope.mode = 'list';
      this.supplements = res.data;
    }, (err) => {
      console.log(err);
    });
  }.bind(this);

  this.addSupplement = function() {
    $http.post('http://localhost:3000/supplements', this.newSupplement)
    .then((res) => {
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

  this.updateSupplement = function(supplement, updatedSupplement) {
    if (updatedSupplement.name) supplement.name = updatedSupplement.name;
    if (updatedSupplement.medicinalEffects) supplement.medicinalEffects = updatedSupplement.medicinalEffects.split(',') || updatedSupplement.medicinalEffects;
    if (updatedSupplement.sideEffects) supplement.sideEffects = updatedSupplement.sideEffects.split(',') || updatedSupplement.sideEffects;
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
