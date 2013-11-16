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