
angular.module('RDash')
  .controller('roomsCtrl', ['$scope','$rootScope','RoomsService','Notification', roomsCtrl]);

function roomsCtrl($scope,$rootScope, RoomsService,Notification) {

  $rootScope.currentPage = "Rooms";

  $scope.usedLang = $rootScope.defaultLang;
  $scope.selectedRoom = null;

  $scope.rooms = [];

  RoomsService.getRooms().then(function (data){
    $scope.rooms = data.data;
  });

  $scope.selectRoom = function(room){
    $scope.selectedRoom = room;
  }


  $scope.deleteRoom = function(){
    RoomsService.deleteRoom($scope.selectedRoom._id).then (function (data){
      $scope.rooms.splice($scope.rooms.indexOf($scope.selectedRoom),1);
      $scope.selectedRoom = null;
      Notification.primary({message: 'Room removed!'});
    }).catch(function (err) {
      Notification.error({message: 'Failed to remove room!'});
    });
  }

  $scope.getRoomTitleByLang = function (room) {
    for (var i = 0; i < room.title.length; i++) {
      if (room.title[i].lang == $scope.usedLang) {
        return room.title[i].text;
      }
    }
    return '';
  }

  $scope.getRoomTypeByLang = function (room) {
    for (var i = 0; i < room.type.length; i++) {
      if (room.type[i].lang == $scope.usedLang) {
        return room.type[i].text;
      }
    }
    return '';
  }
}