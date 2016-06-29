module.exports = function(app) {
  app.directive('FormDirective', function() {
    return {
      scope: {
        type: '@',
        supplement: '='
      },
      templateUrl: './templates/supplements/form.html',
      require: '^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.deleteSupplement = controller.deleteSupplement;
        $scope.submit = $scope.type === 'new' ? controller.addSupplement : controller.updateSupplement;
      }
    };
  });
};
