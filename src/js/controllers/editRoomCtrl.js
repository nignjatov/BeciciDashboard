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

    $scope.titleEdit = "";
    $scope.typeEdit = "";
    $scope.descEdit = "";

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
    $scope.roomServicesAll = [];
    HotelServicesService.getRoomServices().then(function (roomServices) {
        $scope.roomServicesAll = roomServices.data;
        if (roomId != '') {
            RoomsService.getRoomById(roomId).then(function (data) {
                if (data.data.length == 1) {
                    $scope.room = data.data[0];
                    $scope.getRoomTitleByLang($scope.usedLang);
                    $scope.getRoomTypeByLang($scope.usedLang);
                    $scope.getRoomDescriptionByLang($scope.usedLang);
                    $scope.imageURL = $rootScope.getImageUrl($scope.room.image);
                    $scope.mergeServices();
                }
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
        Notification.primary({message: 'New available termin saved!'});
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

    $scope.getRoomServiceByLang = function (service, lang) {
        for (var i = 0; i < service.title.length; i++) {
            if (service.title[i].lang == lang) {
                return service.title[i].text;
            }
        }
        return '';
    }

    $scope.editRoomType = function (newType) {
        for (var i = 0; i < $scope.room.type.length; i++) {
            if ($scope.room.type[i].lang == $scope.usedLang) {
                $scope.room.type[i].text = newType;
            }
        }
    }

    $scope.editRoomTitle = function (newTitle) {
        for (var i = 0; i < $scope.room.title.length; i++) {
            if ($scope.room.title[i].lang == $scope.usedLang) {
                $scope.room.title[i].text = newTitle;
            }
        }
    }

    $scope.editRoomDescription = function (newDescirption) {
        for (var i = 0; i < $scope.room.description.length; i++) {
            if ($scope.room.description[i].lang == $scope.usedLang) {
                $scope.room.description[i].text = newDescirption;
            }
        }
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
        $scope.getRoomTitleByLang($scope.usedLang);
        $scope.getRoomTypeByLang($scope.usedLang);
        $scope.getRoomDescriptionByLang($scope.usedLang);
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

    $scope.getServiceTitleByLang = function (roomService) {
        for (var i = 0; i < roomService.title.length; i++) {
            if (roomService.title[i].lang == $scope.usedLang) {
                return roomService.title[i].text;
            }
        }
        return '';
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
        $scope.toMaxDate = $scope.toMinDate.getTime() + 14*24*3600*1000;
        $scope.newTermin.to = null;
    });
}