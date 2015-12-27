angular.module('RDash')
  .controller('multimediaCtrl', ['$scope', '$rootScope', 'AlbumsService', multimediaCtrl]);

function multimediaCtrl($scope, $rootScope, AlbumsService) {

  $rootScope.currentPage = "Multimedia";

  $scope.selectedAlbum = null;

  $scope.albums = [];

  AlbumsService.getAlbums().then(function (data) {
    $scope.albums = data.data;
  });

  $scope.selectAlbum = function (album) {
    $scope.selectedAlbum = album;
  }

  $scope.deleteAlbum = function () {
    AlbumsService.deleteAlbum($scope.selectedAlbum._id).then(function (data){
      $scope.albums.splice($scope.albums.indexOf($scope.selectedAlbum), 1);
      $scope.selectedAlbum = null;
    });
  }

  $scope.getAlbumNameByLang = function (album) {
    for (var i = 0; i < album.name.length; i++) {
      if (album.name[i].lang == $rootScope.defaultLang) {
        return album.name[i].text;
      }
    }
  }


}