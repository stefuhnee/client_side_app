module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      scope: {
        type: '@',
        resource: '@'
      },
      templateUrl: './templates/list.html'
    };
  });
};
