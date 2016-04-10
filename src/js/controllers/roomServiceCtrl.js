angular.module('RDash')
    .controller('roomServiceCtrl', ['$scope', '$rootScope', '$modal', 'HotelServicesService', 'Notification', roomServiceCtrl]);

function roomServiceCtrl($scope, $rootScope, $modal, HotelServicesService, Notification) {

    $rootScope.currentPage = "Room Services";

    $scope.editRoomService = null;

    $scope.editTitle = {};
    $scope.titleLang = $rootScope.defaultLang;

    $scope.roomServices = [];
    HotelServicesService.getRoomServices().then(function (data) {
        $scope.roomServices = data.data;
    });

    $scope.selectRoomService = function (roomService) {
        $scope.editRoomService = angular.extend({}, roomService);

        $scope.titleLang = $rootScope.defaultLang;
    }

    $scope.addRoomService = function () {
        $scope.editRoomService = {
            serviceType: "roomService",
            title: $rootScope.createLangFields(),
            created_at: Date.now()
        };

        $scope.titleLang = $rootScope.defaultLang;
    }

    $scope.saveRoomService = function () {
        if (typeof $scope.editRoomService._id === 'undefined') {
            //new service
            console.log("Creating room service ");
            HotelServicesService.createService($scope.editRoomService).then(function (data) {
                $scope.roomServices.push(data.data);
                $scope.editRoomService = null;
                Notification.primary({message: 'Created new room service!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to create room service!'});
            });
        } else {
            HotelServicesService.updateService($scope.editRoomService._id, $scope.editRoomService).then(function (data) {
                $scope.editRoomService = null;
                Notification.primary({message: 'Room service updated!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to update room service!'});
            });
        }

    }
    $scope.deleteRoomService = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            HotelServicesService.deleteHotelService($scope.editRoomService._id).then(function (data) {
                $scope.roomServices.splice($scope.roomServices.indexOf($scope.editRoomService), 1);
                $scope.editRoomService = null;
                Notification.primary({message: 'Room service removed!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to remove room service!'});
            });
        });
    }


    $scope.changeTitleLang = function (lang) {
        $scope.titleLang = lang;
    }

    $scope.sortType = "title";
    $scope.sortReverse = "true";
    $scope.searchWord = '';
}