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
  .controller('editRoomCtrl', ['$scope','$rootScope','$window','roomsService', editRoomCtrl]);

function editRoomCtrl($scope,$rootScope,$window, roomsService) {

  $scope.newTermin = null;

  $scope.usedLang = $rootScope.defaultLang;

  $scope.titleEdit = "";
  $scope.typeEdit = "";
  $scope.descEdit = "";

  $scope.room = {
    title : [
      {
      text : "King size",
      lang : 'en'
      },
      {
        text : "Kraljevski apartman",
        lang : 'rs'
      }
    ],
    type : [
      {
        text : "Appartment",
        lang : 'en'
      },
      {
        text : "Apartman",
        lang : 'rs'
      }
    ],
    description : [
      {
        text : "Best room in hotel",
        lang : 'en'
      },
      {
        text : "Najbolja soba u hotelu",
        lang : 'rs'
      }
    ],
    image : "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
    available : [
      {
        from: Date.now(),
        to: Date.now(),
        amount: 5
      }
    ],
    price : 199,
    bed_number : 3,
    free_services : [
      {
        title: [
        {
          text: 'Free cable',
          lang: 'en'
        },
        {
          text: 'Besplatna televizija',
          lang: 'rs'
        }],
        created_at: Date.now(),
        active: true}
    ],
    created_at : Date.now(),
    last_modified : Date.now()
  };


  $scope.saveChanges = function(){
    console.log($scope.room);
  }

  $scope.saveChanges = function(){
    $window.history.back();
  }
  $scope.addNewTermin = function(){
    $scope.newTermin = {};
  }

  $scope.saveNewTermin = function(){
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

  $scope.getRoomServiceByLang = function (service,lang) {
    for (var i = 0; i < service.title.length; i++) {
      if (service.title[i].lang == lang) {
        return service.title[i].text;
      }
    }
    return '';
  }

  $scope.editRoomType = function (newType){
    for (var i = 0; i < $scope.room.type.length; i++) {
      if ($scope.room.type[i].lang == $scope.usedLang) {
        $scope.room.type[i].text = newType;
      }
    }
  }

  $scope.editRoomTitle = function (newTitle){
    for (var i = 0; i < $scope.room.title.length; i++) {
      if ($scope.room.title[i].lang == $scope.usedLang) {
        $scope.room.title[i].text = newTitle;
      }
    }
  }

  $scope.editRoomDescription = function (newDescirption){
    for (var i = 0; i < $scope.room.description.length; i++) {
      if ($scope.room.description[i].lang == $scope.usedLang) {
        $scope.room.description[i].text = newDescirption;
      }
    }
  }

  $scope.changeLang = function(lang){
    $scope.usedLang = lang;
    $scope.getRoomTitleByLang($scope.usedLang);
    $scope.getRoomTypeByLang($scope.usedLang);
    $scope.getRoomDescriptionByLang($scope.usedLang);
  }

  $scope.getRoomTitleByLang($scope.usedLang);
  $scope.getRoomTypeByLang($scope.usedLang);
  $scope.getRoomDescriptionByLang($scope.usedLang);



}