angular.module('RDash')
    .controller('freeServicesCtrl', ['$scope', '$rootScope', '$modal','$filter', 'HotelServicesService', 'Notification', freeServicesCtrl]);

function freeServicesCtrl($scope, $rootScope, $modal,$filter, HotelServicesService, Notification) {

    $rootScope.currentPage = "FREE_SERVICES";

    $scope.obj = {
        flow: null
    };
    $scope.multimedia = "";
    $scope.usedLang = $rootScope.defaultLang;

    $scope.editFreeService = null;

    HotelServicesService.getFreeServices().then(function (data) {
        $scope.freeServices = data.data;
    });

    $scope.selectFreeService = function (freeService) {
        $scope.editFreeService = freeService;
        $scope.usedLang = $rootScope.defaultLang;

        $scope.multimedia = $rootScope.getImageUrl($scope.editFreeService.image);
    }

    $scope.addFreeService = function () {

        $scope.editFreeService = {
            serviceType: "freeService",
            title: $rootScope.createLangFields(),
            description: $rootScope.createLangFields(),
            img: "",
        };

        $scope.multimedia = "";
        $scope.usedLang = $rootScope.defaultLang;
    }

    $scope.saveFreeService = function () {
        if (typeof $scope.editFreeService._id === 'undefined') {
            //new service
            console.log("Creating free service ");
            HotelServicesService.createService($scope.editFreeService).then(function (data) {
                $scope.freeServices.push(data.data);
                $scope.editFreeService = data.data;
                $scope.uploadPicture();
                $scope.editFreeService = null;
                Notification.primary({message: $filter('translate')('CREATED_SERVICE_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_CREATED_SERVICE_ITEM')});
            });
        } else {
            HotelServicesService.updateService($scope.editFreeService._id, $scope.editFreeService).then(function (data) {
                $scope.editFreeService = data.data;
                $scope.uploadPicture();
                $scope.editFreeService = null;
                Notification.primary({message: $filter('translate')('UPDATED_SERVICE_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_UPDATED_SERVICE_ITEM')});
            });
        }
    }

    $scope.deleteFreeService = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            HotelServicesService.deleteHotelService($scope.editFreeService._id).then(function (data) {
                $scope.freeServices.splice($scope.freeServices.indexOf($scope.editFreeService), 1);
                $scope.editFreeService = null;
                Notification.primary({message: $filter('translate')('DELETED_SERVICE_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_DELETED_SERVICE_ITEM')});
            });
        });
    }

    $scope.editFreeServiceDescription = function (desc) {
        for (var i = 0; i < $scope.editFreeService.description.length; i++) {
            if ($scope.editFreeService.description[i].lang == $scope.usedLang) {
                $scope.editFreeService.description[i].text = desc;
            }
        }
    }

    $scope.editFreeServiceTitle = function (title) {
        for (var i = 0; i < $scope.editFreeService.title.length; i++) {
            if ($scope.editFreeService.title[i].lang == $scope.usedLang) {
                $scope.editFreeService.title[i].text = title;
            }
        }
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
    }

    $scope.uploadPicture = function () {
        if (typeof $scope.obj.flow.files !== 'undefined') {
            HotelServicesService.uploadImage($scope.editFreeService._id, $scope.obj.flow).then(function (data) {
                for (var i = 0; i < $scope.freeServices.length; i++) {
                    if ((typeof $scope.freeServices[i]._id !== 'undefined') && ($scope.freeServices[i]._id == data._id)) {
                        $scope.freeServices[i].image = data.filename;
                    }
                }
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('PICTURE_NOT_UPLOADED')});
            });

        }
    }

    $scope.sortType = "title";
    $scope.sortReverse = "true";
    $scope.searchWord = '';
}