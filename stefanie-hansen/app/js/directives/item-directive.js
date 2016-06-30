module.exports = function(app) {
  app.directive('itemDirective', function() {
    return {
      scope: {
        type: '@',
        resource: '='
      },
      templateUrl: './templates/item.html'
      // require: '^ngController',
      // link: function($scope, elem, attr, controller) {
      //   $scope[$scope.resource] = controller[$scope.resource];
      // }
    };
  });
};
