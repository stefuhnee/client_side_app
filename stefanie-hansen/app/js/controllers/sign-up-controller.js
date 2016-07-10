'use strict';

module.exports = function(app) {
  app.controller('SignUpController', function($location, AuthService) {
    
    this.signUp = function(user) {
      AuthService.signUp(user)
        .then((res) => {
          console.log(res, 'back in controller');
        })
        .then((err) => {
          console.log(err);
        });
    };
  });
};
