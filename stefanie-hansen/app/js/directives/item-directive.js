module.exports = function(app) {
  app.directive('itemDirective', function() {
    return {
      scope: {
        type: '@',
        plant: '@',
        supplement: '@'
      },
      templateUrl: './templates/item.html',
      link: function($scope, elem, attr, controller) {
        $scope.toggleItem = controller.toggleItem;
        $scope.resource = controller.resource;
      },
      require: '^ngController'
    };
  });
};
