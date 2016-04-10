angular.module('RDash')
    .service('ReservationsService', function ($http, $rootScope, $q) {

        var servicePrefix = '/reservations/';
        return {
            getReservations: function () {
                return $http({
                    method: 'GET',
                    url: servicePrefix + 'list/all',
                });
            },
            approveReservation: function (paymentId, reservationData) {
                return $http({
                    method: 'PATCH',
                    url: servicePrefix + paymentId + '/capture',
                    data: reservationData
                });
            },
            rejectReservation: function (paymentId, reservationData) {
                return $http({
                    method: 'PATCH',
                    url: servicePrefix + paymentId + '/reject',
                    data: reservationData
                });
            },
            saveRoomNumber: function (paymentId, roomNumber) {
                return $http({
                    method: 'PUT',
                    url: servicePrefix + paymentId + '/roomnumber',
                    data: {
                        roomNumber: roomNumber
                    }
                });
            }
        }
    });