'use strict';

const angular = require('angular');

const app = angular.module('HealthApp', []);

require('./plant')(app);
require('./supplement')(app);
