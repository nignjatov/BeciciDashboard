angular.module('RDash')
    .controller('roomsCtrl', ['$scope', '$rootScope', '$modal','$filter', 'RoomsService', 'Notification', roomsCtrl]);

function roomsCtrl($scope, $rootScope, $modal, $filter, RoomsService, Notification) {

    $rootScope.currentPage = "ROOMS";

    $scope.usedLang = $rootScope.defaultLang;
    $scope.selectedRoom = null;

    $scope.rooms = [];

    RoomsService.getRooms().then(function (data) {
        $scope.rooms = data.data;
    });

    $scope.selectRoom = function (room) {
        $scope.selectedRoom = room;
    }


    $scope.deleteRoom = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            if (retModal == true) {
                RoomsService.deleteRoom($scope.selectedRoom._id).then(function (data) {
                    $scope.rooms.splice($scope.rooms.indexOf($scope.selectedRoom), 1);
                    $scope.selectedRoom = null;
                    Notification.primary({message: $filter('translate')('DELETED_ROOM')});
                }).catch(function (err) {
                    Notification.error({message: $filter('translate')('NOT_DELETED_ROOM')});
                });
            }
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

angular.module('RDash').controller('deleteModalCtrl', ['$scope', '$modalInstance', deleteModalCtrl]);

function deleteModalCtrl($scope, $modalInstance) {

    $scope.yes = function () {
        $modalInstance.close(true);
    }

    $scope.no = function () {
        $modalInstance.dismiss('cancel');
    };
}