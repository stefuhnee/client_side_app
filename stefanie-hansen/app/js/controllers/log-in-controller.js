'use strict';

module.exports = function(app) {
  app.controller('LogInController', function($location, AuthService) {

    this.goHome = function() {
      $location.url('/');
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
        .then((res) => {
          console.log(res);
        });
    };
  });
};
