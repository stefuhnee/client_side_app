'use strict';

const angular = require('angular');

const app = angular.module('HealthApp', []);

require('./controllers')(app);
require('./directives')(app);
