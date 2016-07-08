'use strict';

module.exports = function(app) {
  app.controller('SigninController', function($location, AuthService) {
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

    this.signIn = function(user) {
      AuthService.signIn(user)
        .then((res) => {
          console.log(res, 'sign in res');
        });
    };
  });
};
