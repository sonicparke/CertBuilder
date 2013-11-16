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
app.controller('MainCtrl', function ($scope){

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    // Initial Functions
    $scope.InitPage = function() {
        $scope.PageTitle = "Cert Builder";
    };

});


app.controller('CertCtrl', function ($scope){




});

app.controller('AdminCtrl', function ($scope){
    $scope.PageTitle = "Admin";


});

app.controller('AdminRankCtrl', function ($scope){
    $scope.PageTitle = "Belt Ranks";
    $scope.AddNewRank = function () {
        console.log('newRank',$scope.newRank);
    };

});

app.controller('AdminStudentCtrl', function ($scope){

    $scope.PageTitle = "Students";
    $scope.AddNewStudent = function () {
        console.log('newStudentName',$scope.newStudentName);
    };



});

app.controller('AdminInstructorCtrl', function ($scope){


    $scope.PageTitle = "Instructors";


});
angular.module("ui.bootstrap.alert", []).directive('alert', function ($timeout) {
  return {
    restrict:'E',
    templateUrl: 'Content/partials/alert.html',
    transclude:true,
    scope:{
      type:'=',
      close:'&',
      autoclose: '=',
      autoclosetime: '='
    },
    link:function (scope, element, attrs) {
      scope.type = scope.type || 'info';

      scope.timedDismiss = function (index) {
          $timeout(function () {
            scope.close();
          }, scope.autoclosetime);
        };

      if(scope.autoclose === true){
        scope.timedDismiss();
      }

      scope.dismiss = function () {
        scope.close();
      };
    }
  };
});

// Example DOM Element with View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert($index)">{{alert.msg}}<a ng-show="alert.url.length > 0" class="btn btn-mini btn-primary pull-right" href="{{alert.url}}" target="_blank">View File</a></alert>

// Example DOM Element without View File option:
// <alert ng-repeat="alert in alerts" type="alert.type" autoclose="alert.autoclose" autoclosetime="alert.autoclosetime" close="closeAlert($index)">{{alert.msg}}</alert>

// Setup Alerts in controller
// $scope.alerts = [];
// $scope.closeAlert = function (index) {
//     $scope.alerts.splice(index, 1);
// };

// Push Alert from controller
// $scope.alerts.push({msg: "Please enter End Date", type:'error', autoclose: true, autoclosetime: 3000});
app.directive('buttonUi', function () {
    return{
        restrict: 'E',
        replace: true,
        controller: 'MainCtrl',
        templateUrl: 'Content/partials/button.html?c=' + new Date().getTime(),
        scope:{
          clickFn: '&',
          text: '@',
          activeText: '@',
          buttonClass: '@',
          icon: '@',
          buttonDisabled: '=',
          showButton: '=?'
        },
        link:function (scope, element, attrs) {
          scope.showButton = true;
          scope.onClick = function(){
            scope.error = undefined;
            scope.updating = true;
            scope.disabled = true;
            var promise = scope.clickFn();
            promise.then( function() { 
                scope.updating = false;
                scope.disabled = false;
              }, function(error) { 
                scope.updating=false;
                scope.disabled = false;
                scope.error = error;
              });
              
          };
        }
    };
});

////////// USE //////////
// <button-ui text="Search" button-disabled="disabled" active-text="Searching" click-fn="editHours($index, item)" icon="icon-search"></button-ui>


////////// Template in _button.html //////////
// <button class="btn {{buttonClass}}" ng-click="onClick()" ng-disabled="disabled">
//   <i class="{{icon}}" ng-class="{'icon-spinner icon-spin': updating}"></i> 
//   {{ updating && activeText || text  }}
// </button>
//////// Get Data //////////
// GoAngular //
// app.config(function(platformProvider) {
// 	var rooms = ['certs', 'belts'];
// 	platformProvider.set('https://goinstant.net/sonicparke/CertBuilder');
// });