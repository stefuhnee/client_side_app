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
  .when('/signin', {
    templateUrl:'./views/partials/signin.html',
    controller: 'SigninController',
    controllerAs: 'signinctrl'
  });
});

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);
