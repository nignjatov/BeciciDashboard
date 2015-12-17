
angular.module('RDash')
  .controller('roomsCtrl', ['$scope','roomsService', roomsCtrl]);

function roomsCtrl($scope, roomsService) {

  roomsService.test();
}