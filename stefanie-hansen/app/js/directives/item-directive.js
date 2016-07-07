'use strict';

module.exports = function(app) {
  app.directive('itemDirective', function() {
    return {
      scope: {
        plant: '@',
        supplement: '@',
        currentresource: '='
      },
      templateUrl: './templates/item.html',
      link: function($scope, elem, attr, controller) {
        $scope.toggleItem = controller.toggleItem;
      },
      require: '^ngController'
    };
  });
};
