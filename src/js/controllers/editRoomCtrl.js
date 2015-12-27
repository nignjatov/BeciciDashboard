/*
 * Copyright (C) 2013-2014 RT-RK, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the
 * proprietary information of RT-RK and is confidential in nature.
 *
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of RT-RK.
 */

angular.module('RDash')
  .controller('editRoomCtrl', ['$scope', '$rootScope', '$window', '$state', 'RoomsService', 'HotelServicesService', editRoomCtrl]);

function editRoomCtrl($scope, $rootScope, $window, $state, RoomsService, HotelServicesService) {

  $rootScope.currentPage = "Edit Room";

  $scope.newTermin = null;

  $scope.usedLang = $rootScope.defaultLang;

  $scope.titleEdit = "";
  $scope.typeEdit  = "";
  $scope.descEdit  = "";

  $scope.obj         = {
    flow: null
  }
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.format      = 'shortDate';

  $scope.statusFrom = {
    opened: false
  };
  $scope.statusTo = {
    opened: false
  };

  var roomId = $state.params.roomId;
  console.log("Room Id " + roomId);

  $scope.room = {
    title: [
      {
        text: "",
        lang: 'en'
      },
      {
        text: "",
        lang: 'rs'
      }
    ],
    type: [
      {
        text: "",
        lang: 'en'
      },
      {
        text: "",
        lang: 'rs'
      }
    ],
    description: [
      {
        text: "",
        lang: 'en'
      },
      {
        text: "",
        lang: 'rs'
      }
    ],
    available: [],
    free_services : [],
    price: 0,
    bed_number: 0,
    free_services: [],
    created_at: Date.now(),
    last_modified: Date.now()
  };
  $scope.roomServicesAll = [];
  HotelServicesService.getRoomServices().then(function (roomServices) {
    $scope.roomServicesAll = roomServices.data;
    if (roomId != '') {
      RoomsService.getRoomById(roomId).then(function (data) {
        if (data.data.length == 1) {
          $scope.room     = data.data[0];
          $scope.getRoomTitleByLang($scope.usedLang);
          $scope.getRoomTypeByLang($scope.usedLang);
          $scope.getRoomDescriptionByLang($scope.usedLang);
          $scope.imageURL = $rootScope.getImageUrl($scope.room.image);
          $scope.mergeServices();
        }
      });
    } else {
      $scope.mergeServices();
    }
  });


  $scope.saveChanges = function () {
    if (typeof $scope.room._id === 'undefined') {
      RoomsService.createRoom($scope.room).then(function (data) {
        $scope.room = data.data;
        $scope.uploadPicture();
      });
    } else {
      RoomsService.updateRoom($scope.room._id, $scope.room).then(function (data) {
        $scope.uploadPicture();
      })
    }
  }

  $scope.discardChanges = function () {
    $window.history.back();
  }
  $scope.addNewTermin   = function () {
    $scope.newTermin = {};
  }

  $scope.saveNewTermin = function () {
    $scope.room.available.push($scope.newTermin);
    $scope.newTermin = null;
  }

  $scope.getRoomTitleByLang = function (lang) {
    for (var i = 0; i < $scope.room.title.length; i++) {
      if ($scope.room.title[i].lang == lang) {
        $scope.titleEdit = $scope.room.title[i].text;
        return $scope.room.title[i].text;
      }
    }
    return '';
  }

  $scope.getRoomTypeByLang = function (lang) {
    for (var i = 0; i < $scope.room.type.length; i++) {
      if ($scope.room.type[i].lang == lang) {
        $scope.typeEdit = $scope.room.type[i].text;
        return $scope.room.type[i].text;
      }
    }
    return '';
  }

  $scope.getRoomDescriptionByLang = function (lang) {
    for (var i = 0; i < $scope.room.description.length; i++) {
      if ($scope.room.description[i].lang == lang) {
        $scope.descEdit = $scope.room.description[i].text;
        return $scope.room.description[i].text;
      }
    }
    return '';
  }

  $scope.getRoomServiceByLang = function (service, lang) {
    for (var i = 0; i < service.title.length; i++) {
      if (service.title[i].lang == lang) {
        return service.title[i].text;
      }
    }
    return '';
  }

  $scope.editRoomType = function (newType) {
    for (var i = 0; i < $scope.room.type.length; i++) {
      if ($scope.room.type[i].lang == $scope.usedLang) {
        $scope.room.type[i].text = newType;
      }
    }
  }

  $scope.editRoomTitle = function (newTitle) {
    for (var i = 0; i < $scope.room.title.length; i++) {
      if ($scope.room.title[i].lang == $scope.usedLang) {
        $scope.room.title[i].text = newTitle;
      }
    }
  }

  $scope.editRoomDescription = function (newDescirption) {
    for (var i = 0; i < $scope.room.description.length; i++) {
      if ($scope.room.description[i].lang == $scope.usedLang) {
        $scope.room.description[i].text = newDescirption;
      }
    }
  }

  $scope.changeLang = function (lang) {
    $scope.usedLang = lang;
    $scope.getRoomTitleByLang($scope.usedLang);
    $scope.getRoomTypeByLang($scope.usedLang);
    $scope.getRoomDescriptionByLang($scope.usedLang);
  }

  $scope.openFrom = function ($event) {
    $scope.statusFrom.opened = true;
  };
  $scope.openTo = function ($event) {
    $scope.statusTo.opened = true;
  };

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      RoomsService.uploadImage($scope.room._id, $scope.obj.flow).then(function (data) {
        $scope.room.image = data.filename;
        $scope.imageURL   = $rootScope.getImageUrl($scope.room.image);
      }).catch(function (err) {
        console.log("FAILURE");
      });
    }
  }

  $scope.mergeServices = function(){
    var dirty = false;
    angular.forEach($scope.roomServicesAll,function(roomServ) {
      var found =false;
      angular.forEach($scope.room.free_services, function(freeServ){
        if(roomServ._id === freeServ.service._id){
          found = true;
        }
      });
      if(found == false){
        dirty = true;
        $scope.room.free_services.push({
          active : false,
          service : roomServ
        });
      }
    });

    angular.forEach($scope.room.free_services,function(freeServ) {
      var found =false;
      angular.forEach($scope.roomServicesAll, function(roomServ){
        if(roomServ._id === freeServ.service._id){
          found = true;
        }
      });
      if(found == false){
        dirty = true;
        $scope.room.free_services.splice($scope.room.free_services.indexOf(freeServ), 1);
      }
    });
    if(dirty == true){
      RoomsService.updateRoom($scope.room._id, $scope.room).then(function (data) {});
    }

  }

  $scope.getServiceTitleByLang = function (roomService) {
    for (var i = 0; i < roomService.title.length; i++) {
      if (roomService.title[i].lang ==  $scope.usedLang) {
        return roomService.title[i].text;
      }
    }
    return '';
  }
}