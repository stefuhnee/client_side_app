'use strict';

module.exports = function(app) {
  app.factory('ParseService', function() {
    const service = {};
    service.plantProps = ['commonName', 'scientificName', 'medicinalUses', 'nutritionalValue', 'zone'];
    service.supplementProps = ['name', 'medicinalEffects', 'sideEffects'];
    service.constructResource = function(resource) {
      return function(updated) {
        let resourceProperties = service[resource + 'Props'];
        for (let i = 0; i < resourceProperties.length; i++) {
          if (Array.isArray(updated[resourceProperties[i]] && updatedpreso)) {
            updated[resourceProperties[i]].split(',') || updated[resourceProperties[i]];
          } else if (updated[resourceProperties[i]])
          }
        }
      };
    };
    return service;
  });
};
