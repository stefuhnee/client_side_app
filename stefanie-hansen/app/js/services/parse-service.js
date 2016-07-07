'use strict';

module.exports = function(app) {
  app.factory('ParseService', function() {
    const service = {};
    service.constructResource = function(updated) {
      for (let key in updated) {
        Array.isArray(updated[key]) ? updated[key] = updated[key].split(',') : updated[key];
      }
      console.log('updated', updated);
      return updated;
    };
    return service;
  });
};
