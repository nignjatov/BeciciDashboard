
angular.module('RDash')
  .service('HotelServicesService', function ($http,$rootScope,$q) {

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
        serviceData.last_modified = new Date();
        return $http({
          method: 'PATCH',
          url:  servicePrefix+''+serviceId,
          data: serviceData
        });
      },
      uploadImage: function (serviceId, flowObj) {
        var deferred = $q.defer();
        flowObj.opts.target = $rootScope.serverUrl +servicePrefix +serviceId;
        flowObj.opts.testChunks=false;
        flowObj.opts.fileParameterName = "image";
        flowObj.on('fileSuccess', function (event,resp) {
          console.log('fileSuccess ', resp);
          deferred.resolve(JSON.parse(resp));
        });
        flowObj.on('fileError', function (event,err) {
          console.log('fileError ', err);
          deferred.reject(JSON.parse(err));
        });
        flowObj.upload();
        return deferred.promise;
      }
    }
  });