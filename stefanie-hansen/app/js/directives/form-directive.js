module.exports = function(app) {
  app.directive('formDirective', function() {
    return {
      scope: {
        type: '@',
        resource: '@',
        updated: '@'
      },
      templateUrl: './templates/form.html',
      require: '^ngController',
      link: function($scope, elem, attr, controller) {

        $scope.mode = 'list';
        // function depends on string that comes in, runs config function and grbs appropriate methods off of controller. allows for reusability between resources based upon the resource passed in.

        // can maybe move to controller, make it generic
        let configMethods = {
          plant: function($scope) {
            $scope.delete = controller.deletePlant;
            $scope.submit = $scope.type === 'new' ? controller.addPlant : controller.updatePlant;
            $scope.formMessage = $scope.type === 'new' ? 'Add a New Plant' : 'Update Plant';
            $scope.resourceProps = ['commonName', 'scientificName', 'medicinalUses', 'nutritionalValue', 'zone'];
          },
          supplement: function($scope) {
            $scope.delete = controller.deleteSupplement;
            $scope.submit = $scope.type === 'new' ? controller.addSupplement : controller.updateSupplement;
            $scope.formMessage = $scope.type === 'new' ? 'Add a New Supplement' : 'Update Supplement';
            $scope.resourceProps = ['name', 'medicinalEffects', 'sideEffects'];
          }
        };
        configMethods[$scope.resource]($scope);
      }
    };
  });
};
