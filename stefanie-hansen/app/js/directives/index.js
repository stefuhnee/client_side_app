'use strict';

module.exports = function(app) {
  require('./form-directive')(app);
  require('./item-directive')(app);
  require('./list-directive')(app);
};
