'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('HealthApp', [ngRoute]);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/home.html',
    controller: 'PenguinController',
    controllerAs: 'penguinctrl'
  })
  .when('/signin', {
    templateUrl:'./views/signin.html',
    controller: 'SigninController',
    controllerAs: 'signinctrl'
  });
});

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);
