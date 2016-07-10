'use strict';

module.exports = function(app) {
  app.factory('AuthService', function($http) {
    let token;
    const service = {};

    service.signUp = function(user) {
      return $http.post('http://localhost:3000/signup', user)
        .then((res) => {
          token = res.data.token;
          return res;
        });
    };

    service.logIn = function(user) {
      let base64Auth = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64Auth;

      return $http({
        url: 'http://localhost:3000/login',
        method: 'GET',
        headers: {
          authorization: authString
        }
      }).then((res) => {
        token = res.data.token;
        return res;
      });
    };

    service.getToken = function() {
      return token;
    };
    return service;
  });
};
