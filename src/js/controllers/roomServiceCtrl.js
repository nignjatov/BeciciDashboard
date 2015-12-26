angular.module('RDash')
  .controller('roomServiceCtrl', ['$scope', '$rootScope', 'HotelServicesService', roomServiceCtrl]);

function roomServiceCtrl($scope, $rootScope, HotelServicesService) {

  $scope.editRoomService = null;

  $scope.editTitle = {};
  $scope.titleLang = $rootScope.defaultLang;

  $scope.roomServices = [];
  HotelServicesService.getRoomServices().then (function (data) {
    $scope.roomServices = data.data;
  });

  $scope.selectRoomService = function (roomService) {
    $scope.editRoomService = angular.extend({}, roomService);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle.text = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);
  }

  $scope.getServiceTitleByLang = function (roomService, lang) {
    for (var i = 0; i < roomService.title.length; i++) {
      if (roomService.title[i].lang == lang) {
        return roomService.title[i].text;
      }
    }
    return '';
  }

  $scope.addRoomService = function () {
    $scope.editRoomService = {
      serviceType: "roomService",
      title: [
        {
          text: '',
          lang: 'en'
        },
        {
          text: '',
          lang: 'rs'
        }],
      created_at: Date.now()
    };

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle.text = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);

  }

  $scope.saveRoomService   = function () {
    if (typeof $scope.editRoomService._id  === 'undefined') {
      //new service
      console.log("Creating room service ");
      HotelServicesService.createService($scope.editRoomService).then(function(data){
        $scope.roomServices.push(data.data);
        $scope.editRoomService = null;
      });
    } else {
      HotelServicesService.updateService($scope.editRoomService._id,$scope.editRoomService).then(function (data) {
        $scope.editRoomService = null;
      });
    }

  }
  $scope.deleteRoomService = function () {
    HotelServicesService.deleteHotelService($scope.editRoomService._id).then(function (data) {
      $scope.roomServices.splice($scope.roomServices.indexOf($scope.editRoomService), 1);
      $scope.editRoomService = null;
    });
  }

  $scope.editRoomServiceTitle = function (title) {
    for (var i = 0; i < $scope.editRoomService.title.length; i++) {
      if ($scope.editRoomService.title[i].lang == $scope.titleLang) {
        $scope.editRoomService.title[i].text = title;
      }
    }
  }

  $scope.changeTitleLang = function (lang) {
    $scope.titleLang = lang;
    $scope.editTitle.text = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);
    console.log("Changed title lang,text: " + $scope.editTitle.text);
  }
}