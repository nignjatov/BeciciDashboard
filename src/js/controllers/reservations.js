angular.module('RDash')
    .controller('reservationsCtrl', ['$scope', '$rootScope', 'Notification', 'ReservationsService','RoomsService', reservationsCtrl]);

function reservationsCtrl($scope, $rootScope, Notification, ReservationsService,RoomsService) {

    $rootScope.currentPage = "Reservations";

    $scope.selectedReservation = null;

    ReservationsService.getReservations().then(function (data) {
        $scope.reservations = data.data;
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

    $scope.archiveReservation = function () {
        $scope.selectedReservation.status = 'archive';
        $scope.selectedReservation = null;
        Notification.primary({message: 'Reservation archived!'});
    }
    $scope.rejectReservation = function () {
        $scope.selectedReservation.status = 'rejected';
        Notification.primary({message: 'Reservation rejected!'});
    }
    $scope.approveReservation = function () {
        $scope.selectedReservation.status = 'approved';
        Notification.primary({message: 'Reservation approved!'});
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