'use strict';

var app = angular.module('CertBuilder', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider', '$tooltipProvider', function ($routeProvider, $locationProvider, $tooltipProvider){
  $locationProvider.html5Mode(true);
  $routeProvider.when('/admin', {
    controller: 'AdminCtrl',
    templateUrl: 'partials/admin.html',
    reloadOnSearch: false
  });
  $routeProvider.when('/ranks', {
    controller: 'AdminRankCtrl',
    templateUrl: 'partials/ranks.html',
    reloadOnSearch: false
  });
  $routeProvider.when('/students', {
    controller: 'AdminStudentCtrl',
    templateUrl: 'partials/students.html',
    reloadOnSearch: false
  });
  $routeProvider.when('/instructors', {
    controller: 'AdminInstructorCtrl',
    templateUrl: 'partials/instructors.html',
    reloadOnSearch: false
  });
  $routeProvider.otherwise({
    redirectTo: '/',
    controller: 'MainCtrl',
    templateUrl: 'partials/main.html'
  });
  $tooltipProvider.options( {appendToBody: true} );
}]);