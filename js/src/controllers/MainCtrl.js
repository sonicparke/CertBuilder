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