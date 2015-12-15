
angular.module('RDash')
  .controller('roomsCtrl', ['$scope', '$cookieStore', roomsCtrl]);

function roomsCtrl($scope,roomsService) {

  roomsService.test();
}