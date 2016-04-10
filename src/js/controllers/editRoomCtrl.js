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
    .controller('editRoomCtrl', ['$scope', '$rootScope', '$window', '$state', 'RoomsService', 'HotelServicesService', 'Notification', editRoomCtrl]);

function editRoomCtrl($scope, $rootScope, $window, $state, RoomsService, HotelServicesService, Notification) {

    $rootScope.currentPage = "Edit Room";

    $scope.newTermin = null;

    $scope.usedLang = $rootScope.defaultLang;

    $scope.obj = {
        flow: null
    }
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.minDate = new Date();
    $scope.toMinDate = new Date();
    $scope.toMaxDate = new Date().setDate($scope.toMinDate.getDate() + 14);

    $scope.format = 'shortDate';

    $scope.statusFrom = {
        opened: false
    };
    $scope.statusTo = {
        opened: false
    };

    var roomId = $state.params.roomId;
    console.log("Room Id " + roomId);

    $scope.room = {
        title: $rootScope.createLangFields(),
        type: $rootScope.createLangFields(),
        description: $rootScope.createLangFields(),
        available: [],
        free_services: [],
        child_discount: 0,
        child_bed_discount: 0,
        bed_number: 0,
        created_at: Date.now(),
        last_modified: Date.now(),
        price: {}
    };

    $scope.terminYear = new Date().getFullYear();

    $scope.termins = [];

    $scope.roomServicesAll = [];
    HotelServicesService.getRoomServices().then(function (roomServices) {
        $scope.roomServicesAll = roomServices.data;
        if (roomId != '') {
            RoomsService.getRoomById(roomId).then(function (data) {
                if (data.data.length == 1) {
                    $scope.room = data.data[0];
                    $scope.imageURL = $rootScope.getImageUrl($scope.room.image);
                    $scope.mergeServices();
                }
                angular.forEach($scope.room.available,function(termin){
                   if(new Date(termin.from).getFullYear() == $scope.terminYear){
                       $scope.termins.push(termin);
                   }
                });
            });
        } else {
            $scope.mergeServices();
        }
    });


    $scope.saveChanges = function () {
        if (typeof $scope.room._id === 'undefined') {
            RoomsService.createRoom($scope.room).then(function (data) {
                $scope.room = data.data;
                $scope.room._id = data.data._id;
                $scope.uploadPicture();
                Notification.primary({message: 'New room created!'});
            });
        } else {
            RoomsService.updateRoom($scope.room._id, $scope.room).then(function (data) {
                $scope.uploadPicture();
                Notification.primary({message: 'Room updated!'});
            })
        }
    }

    $scope.discardChanges = function () {
        $window.history.back();
    }
    $scope.addNewTermin = function () {
        $scope.newTermin = {};
    }

    $scope.openTermin = function (termin) {
        $scope.newTermin = termin;
    }

    $scope.closeTermin = function () {
        $scope.newTermin = null;
    }

    $scope.deleteTermin = function () {
        $scope.room.available.push($scope.newTermin);
        $scope.newTermin = null;
    }
    $scope.saveNewTermin = function () {
        var added = false;
        $scope.newTermin.remained = $scope.newTermin.amount;
        angular.forEach($scope.room.available, function (termin) {
            if (added == false) {
                var newFrom = new Date($scope.newTermin.from).getTime();
                var newTo = new Date($scope.newTermin.to).getTime();
                var terFrom = new Date(termin.from).getTime();
                var terTo = new Date(termin.to).getTime();
                if ((newFrom == terFrom) &&
                    (newTo == terTo) &&
                    (termin.price.RSD == $scope.newTermin.price.RSD ) &&
                    (termin.price.EUR == $scope.newTermin.price.EUR )) {
                    termin.amount += parseInt($scope.newTermin.amount);
                    termin.remained += parseInt($scope.newTermin.remained);
                    added = true;
                }
            }
        });
        if (added == false) {
            $scope.room.available.push($scope.newTermin);
        }
        $scope.newTermin = null;
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
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
                $scope.imageURL = $rootScope.getImageUrl($scope.room.image);
            }).catch(function (err) {
                console.log("FAILURE");
            });
        }
    }

    $scope.mergeServices = function () {
        var dirty = false;
        angular.forEach($scope.roomServicesAll, function (roomServ) {
            var found = false;
            angular.forEach($scope.room.free_services, function (freeServ) {
                if (roomServ._id === freeServ.service._id) {
                    found = true;
                }
            });
            if (found == false) {
                dirty = true;
                $scope.room.free_services.push({
                    active: false,
                    service: roomServ
                });
            }
        });

        angular.forEach($scope.room.free_services, function (freeServ) {
            var found = false;
            angular.forEach($scope.roomServicesAll, function (roomServ) {
                if (roomServ._id === freeServ.service._id) {
                    found = true;
                }
            });
            if (found == false) {
                dirty = true;
                $scope.room.free_services.splice($scope.room.free_services.indexOf(freeServ), 1);
            }
        });
        if (dirty == true) {
            RoomsService.updateRoom($scope.room._id, $scope.room).then(function (data) {
            });
        }

    }

    $scope.getMaxDate = function () {
        if ($scope.newTermin.from != null) {
            return new Date().setDate($scope.newTermin.from.getDate() + 14)
        }
    }

    $scope.getMinDate = function () {
        if ($scope.newTermin.from != null) {
            return $scope.newTermin.from;
        } else {
            return $scope.minDate;
        }
    }

    $scope.$watch('newTermin.from', function () {
        $scope.toMinDate = $scope.newTermin.from;
        $scope.toMaxDate = $scope.toMinDate.getTime() + 14 * 24 * 3600 * 1000;
        $scope.newTermin.to = null;
    });

    $scope.changeYear = function(){
        $scope.termins = [];
        $scope.newTermin = null;
    }

    $scope.showTermin = function(termin){
        if(new Date(termin.from).getFullYear() == $scope.terminYear){
            return true;
        }
        return false;
    }
}