
angular.module('RDash')
  .service('ReservationsService', function ($http,$rootScope,$q) {

    var servicePrefix = '/reservations/';
    return {
      getReservations : function(){
        return $http({
          method: 'GET',
          url: servicePrefix + 'list/all',
        });
      }
    }
  });