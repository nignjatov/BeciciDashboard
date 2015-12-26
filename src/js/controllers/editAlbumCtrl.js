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
  .controller('editAlbumCtrl', ['$scope','$rootScope','$window', editAlbumCtrl]);

function editAlbumCtrl($scope,$rootScope,$window) {

  $scope.titleLang = $rootScope.defaultLang;

  $scope.titleEdit = "";

  $scope.album = {
    title : [
      {
        text: "Rooms",
        lang: "en"
      },
      {
        text : "Sobe",
        lang: "rs"
      }],
      images : [
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg"
      ],
    created_at : Date.now(),
    last_modified : Date.now()
  };


  $scope.saveChanges = function(){
    console.log($scope.album);
  }

  $scope.discardChanges = function(){
    $window.history.back();
  }

  $scope.deleteImage = function(image){
    $scope.album.images.splice($scope.album.images.indexOf(image),1);
  }

  $scope.getAlbumTitleByLang = function (lang) {
    for (var i = 0; i < $scope.album.title.length; i++) {
      if ($scope.album.title[i].lang == lang) {
        $scope.titleEdit = $scope.album.title[i].text;
        return $scope.album.title[i].text;
      }
    }
    return '';
  }

  $scope.editAlbumTitle = function (newTitle){
    for (var i = 0; i < $scope.album.title.length; i++) {
      if ($scope.album.title[i].lang == $scope.titleLang) {
        $scope.album.title[i].text = newTitle;
      }
    }
  }

  $scope.changeLang = function(lang){
    $scope.titleLang = lang;
    $scope.getAlbumTitleByLang($scope.titleLang);
  }

  $scope.getAlbumTitleByLang($scope.titleLang);

}