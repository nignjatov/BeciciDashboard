angular.module('RDash')
  .controller('dashboardCtrl', ['$scope', '$rootScope','$cookieStore', dashboardCtrl]);

function dashboardCtrl($scope,$rootScope) {

  $rootScope.currentPage = "Dashboard";

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October"
  ,"November","December"];
  $scope.seriesTop = ['Registered Users', 'Reservations'];
  $scope.dataTop = [
    [0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,2]
  ];

  $scope.dataBottom = [
    [0,0,0,0,0,0,0,0,0,0,0,10000]
  ];
  $scope.seriesBottom = ['Money amount (RSD)'];
  $scope.onClickTop = function (points, evt) {
    console.log(points, evt);
  };
  $scope.onClickBottom = function (points, evt) {
    console.log(points, evt);
  };
}