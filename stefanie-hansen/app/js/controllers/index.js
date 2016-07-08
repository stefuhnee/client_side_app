'use strict';

module.exports = function(app) {
  require('./sign-in-controller')(app);
  require('./health-controller')(app);
};
