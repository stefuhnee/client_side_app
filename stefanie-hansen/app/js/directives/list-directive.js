module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      scope: {
        type: '@',
        resource: '=',
        plant: '@',
        supplement: '@'
      },
      templateUrl: './templates/list.html'
    };
  });
};
