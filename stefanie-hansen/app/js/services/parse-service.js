'use strict';

module.exports = function(app) {
  app.factory('ParseService', function() {
    const service = {};
    service.plantProps = ['commonName', 'scientificName', 'medicinalUses', 'nutritionalValue'];
    service.supplementProps = ['name', 'medicinalEffects', 'sideEffects'];
    service.constructResource = function(resource, newResource) {
      return function(updated) {
        let resourceProperties = service[resource + 'Props'];
        console.log('resourceProperties', resourceProperties);
        console.log('updated', updated);
        console.log('resource', resource);
        console.log('newResource', newResource);
        for (let i = 0; i < resourceProperties.length; i++) {
          if (updated[resourceProperties[i]] && Array.isArray(updated[resourceProperties[i]])) {
            newResource[resourceProperties[i]] = updated[resourceProperties[i]].split(',') || updated[resourceProperties[i]];
          } else {
            newResource[resourceProperties[i]] = updated[resourceProperties[i]];
          }
        }
        console.log('new resource', newResource);
        return newResource;
      };
    };
    return service;
  });
};
