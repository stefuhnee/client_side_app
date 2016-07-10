'use strict';

module.exports = function(app) {
  require('./sign-up-controller')(app);
  require('./log-in-controller')(app);
  require('./resource-controller')(app);
};
