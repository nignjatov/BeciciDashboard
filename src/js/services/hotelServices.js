
angular.module('RDash')
  .service('HotelServicesService', function ($http) {

    var servicePrefix = '/services/';
    return {
      getRoomServices: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/roomService/all'
        });
      },
      getFreeServices: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/freeService/all'
        });
      },
      createService: function (serviceData) {
        return $http({
          method: 'POST',
          url:  servicePrefix,
          data: serviceData
        });
      },
      deleteHotelService: function (serviceId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+''+serviceId
        });
      },
      updateService: function (serviceId,serviceData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+''+serviceId,
          data: serviceData
        });
      }
    }
  });