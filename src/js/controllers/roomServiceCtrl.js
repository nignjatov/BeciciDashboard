
angular.module('RDash')
  .controller('roomServiceCtrl', ['$scope', '$cookieStore', roomServiceCtrl]);

function roomServiceCtrl($scope) {

  $scope.addRoomService = function () {
    console.log("ADD");
  }

}