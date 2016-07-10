'use strict';

module.exports = function(app) {
  app.controller('LoginController', function($location, AuthService) {
    this.goHome = function() {
      $location.url('/');
    };

    this.signUp = function(user) {
      AuthService.signUp(user)
        .then((res) => {
          console.log(res, 'back in controller');
        })
        .then((err) => {
          console.log(err);
        });
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
        .then((res) => {
          console.log(res, 'sign in res');
        });
    };
  });
};
