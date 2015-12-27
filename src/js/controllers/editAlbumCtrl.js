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
  .controller('editAlbumCtrl', ['$scope','$rootScope','$window','$state','AlbumsService', editAlbumCtrl]);

function editAlbumCtrl($scope,$rootScope,$window,$state,AlbumsService) {

  $scope.titleLang = $rootScope.defaultLang;

  $scope.titleEdit = "";

  $scope.obj= {
    flow : null,
  }
  $scope.album = {
    name : [
      {
        text : "",
        lang : "en"
      },
      {
        text : "",
        lang : "rs"
      }
    ]
  };

  $scope.imageUrls = [];

  var albumId = $state.params.albumId;
  console.log("Album Id "+ albumId);
  if(albumId != ''){
    AlbumsService.getAlbumById(albumId).then(function(data){
      if(data.data.length == 1) {
        $scope.album = data.data[0];
        $scope.getAlbumTitleByLang($scope.titleLang);
        angular.forEach($scope.album.images, function(image){
          $scope.imageUrls.push({
            url : $rootScope.getImageUrl(image),
            filename: image
          });
        });
      }
    });
  }

  $scope.saveChanges = function(){
    if (typeof $scope.album._id === 'undefined') {
      AlbumsService.createAlbum($scope.album).then(function (data){
        $scope.album=data.data;
      });
    } else {
      AlbumsService.updateAlbum($scope.album._id,$scope.album).then(function (data){
        $scope.album=data.data;
      })
    }
  }

  $scope.discardChanges = function(){
    $window.history.back();
  }

  $scope.deleteImage = function(image){
    AlbumsService.deleteImage($scope.album._id,image.filename).then(function(data){
      $scope.imageUrls.splice($scope.imageUrls.indexOf(image),1);
    });
  }

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      AlbumsService.uploadImage($scope.album._id, $scope.obj.flow).then(function (data) {
        $scope.imageUrls.push({
          url : $rootScope.getImageUrl(data.filename),
          filename: data.filename
        });
      }).catch( function (err){
        console.log("FAILURE");
      });

    }
  }

  $scope.getAlbumTitleByLang = function (lang) {
    for (var i = 0; i < $scope.album.name.length; i++) {
      if ($scope.album.name[i].lang == lang) {
        $scope.titleEdit = $scope.album.name[i].text;
        return $scope.album.name[i].text;
      }
    }
    return '';
  }

  $scope.editAlbumTitle = function (newTitle){
    for (var i = 0; i < $scope.album.name.length; i++) {
      if ($scope.album.name[i].lang == $scope.titleLang) {
        $scope.album.name[i].text = newTitle;
      }
    }
  }

  $scope.changeLang = function(lang){
    $scope.titleLang = lang;
    $scope.getAlbumTitleByLang($scope.titleLang);
  }

  $scope.getAlbumTitleByLang($scope.titleLang);

}