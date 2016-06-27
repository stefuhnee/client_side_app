module.exports = function(app) {
  require('./form-directive')(app);
  require('./item-directive')(app);
  require('./form-directive')(app);
  require('./resource-directive')(app);
};
