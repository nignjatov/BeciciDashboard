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
  .controller('editAlbumCtrl', ['$scope','$rootScope','$window','$state','$filter','AlbumsService','Notification', editAlbumCtrl]);

function editAlbumCtrl($scope,$rootScope,$window,$state,$filter,AlbumsService,Notification) {

  $rootScope.currentPage = "Edit Album";
  $scope.titleLang = $rootScope.defaultLang;

  $scope.obj= {
    flow : null,
  }
  $scope.album = {
    name : $rootScope.createLangFields()
  };

  $scope.imageUrls = [];

  var albumId = $state.params.albumId;
  console.log("Album Id "+ albumId);

  if(albumId != ''){
    AlbumsService.getAlbumById(albumId).then(function(data){
      if(data.data.length == 1) {
        $scope.album = data.data[0];
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
        Notification.primary({message: $filter('translate')('ALBUM_CREATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('ALBUM_NOT_CREATED')});
      });
    } else {
      AlbumsService.updateAlbum($scope.album._id,$scope.album).then(function (data){
        $scope.album=data.data;
        Notification.primary({message: $filter('translate')('ALBUM_UPDATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('ALBUM_NOT_UPDATED')});
      });
    }
  }

  $scope.discardChanges = function(){
    $window.history.back();
  }

  $scope.deleteImage = function(image){
    AlbumsService.deleteImage($scope.album._id,image.filename).then(function(data){
      $scope.imageUrls.splice($scope.imageUrls.indexOf(image),1);
      Notification.primary({message: $filter('translate')('PICTURE_REMOVED')});
    }).catch(function (err) {
      Notification.error({message: $filter('translate')('PICTURE_NOT_REMOVED')});
    });
  }

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      AlbumsService.uploadImage($scope.album._id, $scope.obj.flow).then(function (data) {
        $scope.imageUrls.push({
          url : $rootScope.getImageUrl(data.filename),
          filename: data.filename
        });
        Notification.primary({message: $filter('translate')('PICTURE_UPLOADED')});
        $scope.obj.flow.cancel();
      }).catch( function (err){
        Notification.error({message: $filter('translate')('PICTURE_NOT_UPLOADED')});
      });

    }
  }

  $scope.changeLang = function(lang){
    $scope.titleLang = lang;
  }

}