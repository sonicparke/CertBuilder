'use strict';
var app = angular.module('CertBuilder', [
    'ngRoute',
    'ui.bootstrap'
  ]);
app.config([
  '$routeProvider',
  '$locationProvider',
  '$tooltipProvider',
  function ($routeProvider, $locationProvider, $tooltipProvider) {
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
    $tooltipProvider.options({ appendToBody: true });
  }
]);
app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.InitPage = function () {
      $scope.PageTitle = 'Cert Builder';
    };
  }
]);
app.controller('CertCtrl', [
  '$scope',
  function ($scope) {
  }
]);
app.controller('AdminCtrl', [
  '$scope',
  function ($scope) {
    $scope.PageTitle = 'Admin';
  }
]);
app.controller('AdminRankCtrl', [
  '$scope',
  function ($scope) {
    $scope.PageTitle = 'Belt Ranks';
    $scope.AddNewRank = function () {
      console.log('newRank', $scope.newRank);
    };
  }
]);
app.controller('AdminStudentCtrl', [
  '$scope',
  function ($scope) {
    $scope.PageTitle = 'Students';
    $scope.AddNewStudent = function () {
      console.log('newStudentName', $scope.newStudentName);
    };
  }
]);
app.controller('AdminInstructorCtrl', [
  '$scope',
  function ($scope) {
    $scope.PageTitle = 'Instructors';
  }
]);
angular.module('ui.bootstrap.alert', []).directive('alert', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'Content/partials/alert.html',
      transclude: true,
      scope: {
        type: '=',
        close: '&',
        autoclose: '=',
        autoclosetime: '='
      },
      link: function (scope, element, attrs) {
        scope.type = scope.type || 'info';
        scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };
        if (scope.autoclose === true) {
          scope.timedDismiss();
        }
        scope.dismiss = function () {
          scope.close();
        };
      }
    };
  }
]);
app.directive('buttonUi', function () {
  return {
    restrict: 'E',
    replace: true,
    controller: 'MainCtrl',
    templateUrl: 'Content/partials/button.html?c=' + new Date().getTime(),
    scope: {
      clickFn: '&',
      text: '@',
      activeText: '@',
      buttonClass: '@',
      icon: '@',
      buttonDisabled: '=',
      showButton: '=?'
    },
    link: function (scope, element, attrs) {
      scope.showButton = true;
      scope.onClick = function () {
        scope.error = undefined;
        scope.updating = true;
        scope.disabled = true;
        var promise = scope.clickFn();
        promise.then(function () {
          scope.updating = false;
          scope.disabled = false;
        }, function (error) {
          scope.updating = false;
          scope.disabled = false;
          scope.error = error;
        });
      };
    }
  };
});