module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      scope: {
        type: '@',
        resource: '=',
        plant: '@',
        supplement: '@'
      },
      templateUrl: './templates/list.html',
      link: function($scope, elem, attr, controller) {
        $scope.toggleItem = controller.toggleItem;
      },
      require: '^ngController'
    };
  });
};
