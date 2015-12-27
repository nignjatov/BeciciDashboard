angular.module('RDash')
  .controller('dashboardCtrl', ['$scope', '$rootScope','$cookieStore', dashboardCtrl]);

function dashboardCtrl($scope,$rootScope) {

  $rootScope.currentPage = "Dashboard";
}