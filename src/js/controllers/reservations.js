angular.module('RDash')
    .controller('reservationsCtrl', ['$scope', '$rootScope', 'Notification', 'ReservationsService', 'RoomsService', reservationsCtrl]);

function reservationsCtrl($scope, $rootScope, Notification, ReservationsService, RoomsService) {

    $rootScope.currentPage = "Reservations";

    $scope.selectedReservation = null;
    $scope.reservations = [];
    ReservationsService.getReservations().then(function (data) {
        angular.forEach(data.data, function (reservation) {
            if (reservation.status != 'INIT') {
                $scope.reservations.push(reservation);
            }
        })

        RoomsService.getRooms().then(function (roomsData) {
            angular.forEach($scope.reservations, function (reservation) {
                if (reservation.order.room) {
                    angular.forEach(roomsData.data, function (room) {
                        if (room._id == reservation.order.room) {
                            reservation.room = room;
                            angular.forEach(room.available, function (termin) {
                                if (termin._id == reservation.order.termin) {
                                    reservation.termin = termin;
                                }
                            });
                        }
                    })
                }
            });

        });
    });

    $scope.selectReservation = function (reservation) {
        $scope.selectedReservation = reservation;
    }

    $scope.saveReservation = function () {
        ReservationsService.saveRoomNumber($scope.selectedReservation.paymentId, $scope.selectedReservation.roomNumber).then(function () {
            Notification.primary({message: 'Reservation updated!'});
        }).catch(function (err) {
            Notification.error({message: 'Failed to update reservation!'});
        })
    }
    $scope.archiveReservation = function () {
        $scope.selectedReservation.status = 'archive';
        $scope.selectedReservation = null;
        Notification.primary({message: 'Reservation archived!'});
    }
    $scope.rejectReservation = function () {
        var req = {
            order: {
                room: $scope.selectedReservation.room._id,
                termin: $scope.selectedReservation.termin._id
            },
            email: $scope.selectedReservation.order.email
        };
        console.log(req);
        ReservationsService.rejectReservation($scope.selectedReservation.paymentId, req).then(function (data) {
            $scope.selectedReservation.status = 'VOIDED';
            Notification.primary({message: 'Reservation rejected!'});
        }).catch(function (err) {
            Notification.error({message: 'Failed to reject reservation!'});
        })
    }
    $scope.approveReservation = function () {
        var req = {
            order: {
                room: $scope.selectedReservation.room._id,
                termin: $scope.selectedReservation.termin._id
            },
            email: $scope.selectedReservation.order.email
        };
        console.log(req);
        ReservationsService.approveReservation($scope.selectedReservation.paymentId, req).then(function (data) {
            $scope.selectedReservation.status = 'CAPTURED';
            $scope.selectedReservation.termin.remained--;
            Notification.primary({message: 'Reservation approved!'});
        }).catch(function (err) {
            Notification.error({message: 'Failed to approve reservation!'});
        })
    }

    $scope.getRoomTypeByLang = function (room) {
        if (room) {
            for (var i = 0; i < room.type.length; i++) {
                if (room.type[i].lang == $rootScope.defaultLang) {
                    return room.type[i].text;
                }
            }
        }
    }

    $scope.sortType = "status";
    $scope.sortReverse = "true";
    $scope.searchWord = '';
}