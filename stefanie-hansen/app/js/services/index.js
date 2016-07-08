'use strict';

module.exports = function(app) {
  require('./parse-service')(app);
  require('./authentication-service')(app);
};
