'use strict';

const angular = require('angular');

const app = angular.module('HealthApp', []);

require('./plant')(HealthApp);
require('./supplement')(HealthApp);
