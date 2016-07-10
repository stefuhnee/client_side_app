'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('HealthApp', [ngRoute]);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/partials/home.html',
    controller: 'ResourceController',
    controllerAs: 'rc'
  })
  .when('/login', {
    templateUrl:'./views/partials/login.html',
    controller: 'LogInController',
    controllerAs: 'loginctrl'
  })
  .when('/signup', {
    templateUrl:'./views/partials/signup.html',
    controller: 'SignUpController',
    controllerAs: 'signupctrl'
  });
});

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);
