angular.module('RDash')
    .controller('multimediaCtrl', ['$scope', '$rootScope', '$modal','$filter', 'AlbumsService', 'Notification', multimediaCtrl]);

function multimediaCtrl($scope, $rootScope, $modal,$filter, AlbumsService, Notification) {

    $rootScope.currentPage = "GALLERY";

    $scope.selectedAlbum = null;

    $scope.albums = [];

    AlbumsService.getAlbums().then(function (data) {
        $scope.albums = data.data;
    });

    $scope.selectAlbum = function (album) {
        $scope.selectedAlbum = album;
    }

    $scope.deleteAlbum = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            AlbumsService.deleteAlbum($scope.selectedAlbum._id).then(function (data) {
                $scope.albums.splice($scope.albums.indexOf($scope.selectedAlbum), 1);
                $scope.selectedAlbum = null;
                Notification.primary({message: $filter('translate')('DELETED_ALBUM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_DELETED')});
            });
        });
    }


}